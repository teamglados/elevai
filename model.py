import numpy as np
import xgboost as xgb
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch
from sklearn.metrics import accuracy_score

from data import get_data
from custom.score import f2_score

TARGET_METRIC = "f2_score"


def train(config, data, use_tune=True):
    train_x, test_x, train_y, test_y = data

    # Build input matrices for XGBoost
    train_set = xgb.DMatrix(train_x, label=train_y)
    test_set = xgb.DMatrix(test_x, label=test_y)

    # Train the classifier
    results = {}
    model = xgb.train(
        config, train_set, evals=[(test_set, "eval")], evals_result=results, verbose_eval=False
    )
    preds = model.predict(test_set)

    # NOTE: transfer preds to labels
    pred_labels = np.zeros(test_y.shape)
    pred_labels[np.where(preds > 0.5)] = 1

    metrics = {
        "f2_score": f2_score(test_y, pred_labels),
        "accuracy": accuracy_score(test_y, pred_labels),
    }
    if use_tune:
        tune.report(**metrics, done=True)

    return metrics


def get_search_space(debug=False):
    shared = {
        "objective": "binary:logistic",
        "eval_metric": "logloss",
    }

    if debug:
        return {
            **shared,
            "max_depth": 7,
            "min_child_weight": 2,
        }
    else:
        return {
            **shared,
            "objective": "binary:logistic",
            "eval_metric": "logloss",
            "max_depth": tune.randint(1, 9),
            "min_child_weight": tune.choice([1, 2, 3]),
            "subsample": tune.uniform(0.5, 1.0),
            "eta": tune.loguniform(1e-4, 1e-1),
        }


def tune_xgboost():
    search_space = get_search_space()

    algo = HyperOptSearch()
    algo = ConcurrencyLimiter(algo, max_concurrent=4)

    scheduler = AsyncHyperBandScheduler()

    data = get_data()

    analysis = tune.run(
        tune.with_parameters(train, data=data),
        metric=TARGET_METRIC,
        mode="max",
        # You can add "gpu": 0.1 to allocate GPUs
        resources_per_trial={"cpu": 10},
        config=search_space,
        num_samples=50,
        search_alg=algo,
        scheduler=scheduler,
    )

    return analysis


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--debug", default=None, action="store_true")
    args, _ = parser.parse_known_args()

    if args.debug:
        config = get_search_space(True)
        data = get_data()
        analysis = train(config, data, use_tune=False)
        print(analysis)
    else:
        analysis = tune_xgboost()
        print(analysis.best_config)
        print(analysis.best_result)
