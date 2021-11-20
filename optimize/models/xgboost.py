import xgboost as xgb
from ray import tune

from optimize.models import metrics

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

    return metrics(test_y, preds, use_tune)

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
        # TODO what params to optimize?
        return {
            **shared,
            "objective": "binary:logistic",
            "eval_metric": "logloss",
            "max_depth": tune.randint(1, 9),
            "min_child_weight": tune.choice([1, 2, 3]),
            "subsample": tune.uniform(0.5, 1.0),
            "eta": tune.loguniform(1e-4, 1e-1),
        }
