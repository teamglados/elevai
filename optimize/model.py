import pandas as pd
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch
from sklearn.model_selection import train_test_split, KFold

from optimize.models import conver_probs_to_label
from optimize.models import xgboost, random_forest, catboost, lightgbm
from optimize.data import get_data, smoteenn_sampler, random_under_sampler, get_test_data
from utils.logger import get_logger
import json

TARGET_METRIC = "f2_score"
TARGET_METRIC_MODE = "max"
LOGGER = get_logger(__name__)


def get_model_funcs(model, debug=False):
    if model == "xgboost":
        return xgboost.train, xgboost.get_search_space(debug)
    elif model == "randomforest":
        return random_forest.train, random_forest.get_search_space(debug)
    elif model == "catboost":
        return catboost.train, catboost.get_search_space(debug)
    elif model == "lightgbm":
        return lightgbm.train, lightgbm.get_search_space(debug)
    raise ValueError("Unknown model type!")


def _single_train(train_f, config, data):
    analysis = train_f(config, data)
    LOGGER.info(analysis)
    return config


def single_train(model, data, config=None):
    _train, _search_space = get_model_funcs(model, True)
    train_f = train(train_f=_train, use_tune=False)
    if config:
        _search_space = config
    return _single_train(train_f, _search_space, data)


def train(train_f, use_tune):
    def _train(config, data):
        metrics_items = []
        for _d in data:
            output = train_f(config, _d)
            metrics_items.append(output)

        metrics_df = pd.DataFrame(metrics_items)
        _metrics = metrics_df.mean().to_dict()
        if use_tune:
            tune.report(**_metrics, done=True)
        return _metrics

    return _train


def tune_model(model, data, max_concurrent, num_samples):
    algo = HyperOptSearch()
    algo = ConcurrencyLimiter(algo, max_concurrent=max_concurrent)

    scheduler = AsyncHyperBandScheduler()

    _train, _search_space = get_model_funcs(model)

    analysis = tune.run(
        tune.with_parameters(train(train_f=_train, use_tune=True), data=data),
        metric=TARGET_METRIC,
        mode=TARGET_METRIC_MODE,
        resources_per_trial={"cpu": 1},
        config=_search_space,
        num_samples=num_samples,
        search_alg=algo,
        scheduler=scheduler,
    )

    return analysis


def sample_data(x, y, sampler):
    if sampler == "smothe":
        return smoteenn_sampler(x, y)
    elif sampler == "randomunder":
        return random_under_sampler(x, y)
    elif sampler == "nosampler":
        return x, y
    raise ValueError(f'sampler "{sampler}" is not supported')


def get_kfold_datasets(x, y, n, train_sampler, test_sampler):
    kf = KFold(n_splits=n, shuffle=True, random_state=1)
    data = [
        (
            sample_data(x.iloc[train_index], y.iloc[train_index], train_sampler)
            + sample_data(x.iloc[test_index], y.iloc[test_index], test_sampler)
        )
        for train_index, test_index in kf.split(x)
    ]

    return data


def run(
    debug: bool = False,
    model="xgboost",
    train_sampler="nosampler",
    test_sampler="nosampler",
    max_concurrent=4,
    data_path="data/train.csv",
    test_data_path="data/test.csv",
    num_samples=100,
    kfold_n=5,
):
    """
    Example command: python -m optimize --model=xgboost --kfold_n=5

    Example debug command: python -m optimize --model=xgboost --kfold_n=5 --debug
    """
    x, y = get_data(data_path)

    if kfold_n:
        data = get_kfold_datasets(x, y, kfold_n, train_sampler, test_sampler)
    else:
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=3)
        data = [
            sample_data(x_train, y_train, train_sampler) + sample_data(x_test, y_test, test_sampler)
        ]

    if debug:
        best_config = single_train(model, data)
    else:
        analysis = tune_model(model, data, max_concurrent, num_samples)
        best_config = analysis.best_config
        LOGGER.info(analysis.best_result)
        print("best config: ", json.dumps(best_config, indent=2, sort_keys=True))

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=3)
    # keep same order
    data = x_train, y_train, x_test, y_test
    # is_test doesn't return labels
    test_data, case_id = get_test_data(test_data_path)
    predictions = xgboost.predict(best_config, data, test_data)
    pred_labels = conver_probs_to_label(predictions)

    test_data["feedback"] = pred_labels
    test_data["case_id"] = case_id

    # TODO test that this stores the right values. Split know data and use that
    # one option to test: python -m optimize --model=xgboost --kfold_n=5 --debug --test_data_path="data/train.csv"
    test_data[["case_id", "action_recommendation_id", "feedback"]].to_csv(
        "submission.csv", index=False
    )

