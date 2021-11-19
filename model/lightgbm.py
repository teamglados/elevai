from ray import tune
import lightgbm

from model import metrics


def train(config, data, use_tune=True):
    train_x, test_x, train_y, test_y = data
    lgb = lightgbm.LGBMClassifier(**config)
    lgb.fit(train_x, train_y)
    preds = lgb.predict(test_x)

    return metrics(test_y, preds, use_tune)


def get_search_space(debug=False):
    shared = {}

    if debug:
        return {
            **shared,
        }
    else:
        return {
            "num_leaves": tune.choice(range(50, 100)),
            "max_bin": tune.choice(range(20, 100)),
            "min_data_in_leaf": tune.choice(range(300, 1000)),
            "num_iterations": tune.choice(range(100, 1000)),
            "min_sum_hessian_in_leaf": tune.choice(range(20, 60)),
            "max_depth": tune.choice(range(3, 8)),
            "feature_fraction": tune.uniform(0.2, 0.5),
            "subsample": tune.uniform(0.5, 0.9),
            "bagging_fraction": tune.uniform(0.5, 0.9),
            "learning_rate": tune.uniform(0.001, 0.1),
            "lambda_l1": tune.uniform(0.0001, 1),
            "lambda_l2": tune.uniform(0.0001, 1),
        }
