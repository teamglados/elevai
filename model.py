import fire
import numpy as np
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch


from data import get_data
from model import xgboost

TARGET_METRIC = "f2_score"


def get_model_funcs(model, debug=False):
    if model == "xgboost":
        return xgboost.train, xgboost.get_search_space(debug)


def debug_train(model, data):
    _train, _search_space = get_model_funcs(model, True)
    analysis = _train(_search_space, data, use_tune=False)
    print(analysis)


def tune_model(model, data, cpus, max_concurrent):
    algo = HyperOptSearch()
    algo = ConcurrencyLimiter(algo, max_concurrent=max_concurrent)

    scheduler = AsyncHyperBandScheduler()

    _train, _search_space = get_model_funcs(model)

    analysis = tune.run(
        tune.with_parameters(_train, data=data),
        metric=TARGET_METRIC,
        mode="max",
        # You can add "gpu": 0.1 to allocate GPUs
        resources_per_trial={"cpu": cpus},
        config=_search_space,
        num_samples=50,
        search_alg=algo,
        scheduler=scheduler,
    )

    return analysis


def run(debug: bool = False, model="xgboost", cpus: int = 1, max_concurrent=4):
    data = get_data()

    if debug:
        debug_train(model, data)
    else:
        analysis = tune_model(model, data, cpus, max_concurrent)
        print(analysis.best_config)
        print(analysis.best_result)


if __name__ == "__main__":
    fire.Fire(run)

