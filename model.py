import fire
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch


from data import get_data, smoteenn, random_under_sampler
from model import xgboost, random_forest, catboost, lightgbm

TARGET_METRIC = "f2_score"


def get_model_funcs(model, debug=False):
    if model == "xgboost":
        return xgboost.train, xgboost.get_search_space(debug)
    elif model == "randomforest":
        return random_forest.train, random_forest.get_search_space(debug)
    elif model == "catboost":
        return catboost.train, catboost.get_search_space(debug)
    elif model == "lightgbm":
        return lightgbm.train, lightgbm.get_search_space(debug)

    else:
        raise ValueError("Unknown model type!")


def debug_train(model, data):
    _train, _search_space = get_model_funcs(model, True)
    analysis = _train(_search_space, data, use_tune=False)
    print(analysis)


def tune_model(model, data, cpus, max_concurrent, num_samples):
    algo = HyperOptSearch()
    algo = ConcurrencyLimiter(algo, max_concurrent=max_concurrent)

    scheduler = AsyncHyperBandScheduler()

    _train, _search_space = get_model_funcs(model)

    analysis = tune.run(
        tune.with_parameters(_train, data=data),
        metric=TARGET_METRIC,
        mode="max",
        resources_per_trial={"cpu": cpus},
        config=_search_space,
        num_samples=num_samples,
        search_alg=algo,
        scheduler=scheduler,
    )

    return analysis


def sample_data(x, y, sampler):
    if sampler == "smothe":
        return smoteenn(x, y)
    elif sampler == "randomunder":
        return random_under_sampler(x, y)
    else:
        raise ValueError("Unknown sampler type!")


def run(
    debug: bool = False,
    model="xgboost",
    train_sampler="smothe",
    test_sampler="randomunder",
    cpus: int = 1,
    max_concurrent=4,
    data_path="data/train.csv",
    split_size=0.1,
    num_samples=100,
):
    """
    Example command: python model.py --model=randomforest --debug
    """
    train_x, test_x, train_y, test_y = get_data(data_path, split_size=split_size)

    # run sampler
    train_x, train_y = sample_data(train_x, train_y, train_sampler)
    test_x, test_y = sample_data(test_x, test_y, test_sampler)

    data = train_x, test_x, train_y, test_y

    if debug:
        debug_train(model, data)
    else:
        analysis = tune_model(model, data, cpus, max_concurrent, num_samples)
        print(analysis.best_config)
        print(analysis.best_result)


if __name__ == "__main__":
    fire.Fire(run)

