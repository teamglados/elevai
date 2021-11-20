import xgboost as xgb
from ray import tune

from model import metrics


def _train_model(train_set, test_set, config):
    # Train the classifier
    results = {}
    return xgb.train(
        config, train_set, evals=[(test_set, "eval")], evals_result=results, verbose_eval=False
    )


def get_xgb_datasets(train_x, train_y, test_x, test_y):
    # Build input matrices for XGBoost
    train_set = xgb.DMatrix(train_x, label=train_y)
    test_set = xgb.DMatrix(test_x, label=test_y)
    return train_set, test_set


def train(config, data):

    train_set, test_set = get_xgb_datasets(*data)

    model = _train_model(train_set, test_set, config)
    preds = model.predict(test_set)

    return metrics(test_set.get_label(), preds)


def predict(config, data, test_data):
    # Build input matrices for XGBoost
    train_set, test_set = get_xgb_datasets(*data)

    # TODO how to train with full dataset?
    model = _train_model(train_set, test_set, config)

    final_test_set = xgb.DMatrix(test_data)
    return model.predict(final_test_set)


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
            "eval_metric": tune.choice(["aucpr", "error", "auc", "logloss"]),  #
            "max_depth": tune.randint(0, 30),
            "min_child_weight": tune.choice([1, 2, 3]),
            "subsample": tune.uniform(0.5, 1.0),
            # "gamma": tune.uniform(0, 100),
            # "lambda": tune.uniform(1, 10),
            # "alpha": tune.uniform(0, 1),
            "eta": tune.loguniform(1e-4, 1),
            "scale_pos_weight": tune.choice(
                [0.25, 0.5, 1]
            ),  # https://xgboost.readthedocs.io/en/latest/parameter.html
        }
