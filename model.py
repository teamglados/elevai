
import xgboost as xgb
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch

from data import get_data


def train(config, data, use_tune=True):
    train_x, test_x, train_y, test_y = data

    # Build input matrices for XGBoost
    train_set = xgb.DMatrix(train_x, label=train_y)
    test_set = xgb.DMatrix(test_x, label=test_y)

    # Train the classifier
    results = {}
    xgb.train(
        config, train_set, evals=[(test_set, "eval")], evals_result=results, verbose_eval=False
    )

    accuracy = 1.0 - results["eval"]["error"][-1]
    if use_tune:
        tune.report(mean_accuracy=accuracy, done=True)

    return results


def tune_xgboost():
    search_space = {
        "objective": "binary:logistic",
        "eval_metric": "error",
        "max_depth": tune.randint(1, 9),
        "min_child_weight": tune.choice([1, 2, 3]),
        "subsample": tune.uniform(0.5, 1.0),
        "eta": tune.loguniform(1e-4, 1e-1),
    }

    algo = HyperOptSearch()
    algo = ConcurrencyLimiter(algo, max_concurrent=4)

    scheduler = AsyncHyperBandScheduler()

    data = get_data()

    analysis = tune.run(
        tune.with_parameters(train, data=data),
        metric="mean_accuracy",
        mode="min",
        # You can add "gpu": 0.1 to allocate GPUs
        resources_per_trial={"cpu": 10},
        config=search_space,
        num_samples=10,
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
        config = {
            # You can mix constants with search space objects.
            "objective": "binary:logistic",
            "eval_metric": "error",
            "max_depth": 7,
            "min_child_weight": 2,
        }
        data = get_data()
        analysis = train(config, data, use_tune=False)
        print(analysis)
    else:
        analysis = tune_xgboost()
        print(analysis.best_config)
        print(analysis.best_result)
