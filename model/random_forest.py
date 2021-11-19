from ray import tune
from sklearn.ensemble import RandomForestClassifier

from model import metrics


def train(config, data, use_tune=True):
    train_x, test_x, train_y, test_y = data
    rf = RandomForestClassifier(**config)
    rf.fit(train_x, train_y)
    preds = rf.predict(test_x)

    return metrics(test_y, preds, use_tune)


def get_search_space(debug=False):
    shared = {"random_state": 0}

    if debug:
        return {
            **shared,
            "criterion": "entropy",
            "max_depth": 7,
            "n_estimators": 500,
            "min_samples_split": 3,
            "min_samples_leaf": 1,
            "max_depth": 10,
        }
    else:
        return {
            **shared,
            "criterion": tune.choice(["entropy", "gini"]),
            "n_estimators": tune.randint(1, 2000),
            "max_features": tune.choice(["sqrt", "log2"]),
            "min_samples_split": tune.randint(2, 5),
            "min_samples_leaf": tune.randint(1, 15),
            "max_depth": tune.choice([3, 5, 8, 12, None]),
        }
