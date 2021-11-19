import fire
from ray import tune
from ray.tune.suggest import ConcurrencyLimiter
from ray.tune.schedulers import AsyncHyperBandScheduler
from ray.tune.suggest.hyperopt import HyperOptSearch


from data import get_data
from model import xgboost, random_forest

TARGET_METRIC = "f2_score"


def get_model_funcs(model, debug=False):
    if model == "xgboost":
        return xgboost.train, xgboost.get_search_space(debug)
    elif model == "randomforest":
        return random_forest.train, random_forest.get_search_space(debug)
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


def run(
    debug: bool = False,
    model="xgboost",
    cpus: int = 1,
    max_concurrent=4,
    data_path="data/train.csv",
    split_size=0.1,
    num_samples=100,
):
    """
    Example command: python model.py --model=randomforest --debug
    """
    data = get_data(data_path, split_size=split_size)

    if debug:
        debug_train(model, data)
    else:
        analysis = tune_model(model, data, cpus, max_concurrent, num_samples)
        print(analysis.best_config)
        print(analysis.best_result)


if __name__ == "__main__":
    fire.Fire(run)

