import xgboost as xgb
from ray import tune

from model import metrics


def train(config, data):
    train_x, train_y, test_x, test_y = data

    # Build input matrices for XGBoost
    train_set = xgb.DMatrix(train_x, label=train_y)
    test_set = xgb.DMatrix(test_x, label=test_y)

    # Train the classifier
    results = {}
    model = xgb.train(
        config, train_set, evals=[(test_set, "eval")], evals_result=results, verbose_eval=False
    )
    preds = model.predict(test_set)

    return metrics(test_y, preds)


def get_search_space(debug=False):
    shared = {
        "objective": "binary:logistic",
    }

    if debug:
        return {
            **shared,
            "eval_metric": "aucpr",
            "max_depth": 7,
            "min_child_weight": 2,
        }
    else:
        # TODO what params to optimize?
        return {
            **shared,
            "eval_metric": tune.choice(["aucpr", "error", "auc", "logloss"]),
            "max_depth": tune.randint(0, 30),
            "min_child_weight": tune.choice([1, 2, 3]),
            "subsample": tune.uniform(0.5, 1.0),
            "gamma": tune.uniform(0, 100),
            "lambda": tune.uniform(1, 10),
            "alpha": tune.uniform(0, 1),
            "eta": tune.loguniform(1e-4, 1),
            "scale_pos_weight": tune.uniform(0, 1), # https://xgboost.readthedocs.io/en/latest/parameter.html
        }
