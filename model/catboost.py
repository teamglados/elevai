from ray import tune
from catboost import CatBoostClassifier

from model import metrics


def train(config, data, use_tune=True):
    train_x, test_x, train_y, test_y = data
    cat = CatBoostClassifier(**config)
    cat.fit(train_x, train_y, verbose=False)
    preds = cat.predict(test_x)

    return metrics(test_y, preds, use_tune)


def get_search_space(debug=False):
    shared = {}

    if debug:
        return {
            **shared,
            "n_estimators": 300,
            "depth": 5,
        }
    else:
        return {
            **shared,
            "learning_rate": tune.uniform(0.01, 0.1),
            "depth": tune.randint(3, 10),
            "l2_leaf_reg": tune.uniform(1, 10),
            "boosting_type": tune.choice(["Ordered", "Plain"]),
            "n_estimators": tune.randint(100, 2000),
        }
