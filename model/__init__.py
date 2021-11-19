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