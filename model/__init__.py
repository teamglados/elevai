import numpy as np
from ray import tune
import sklearn.metrics as _metrics

from custom.score import f2_score


def metrics(y_true, preds, use_tune):
    # NOTE: transfer preds to labels
    pred_labels = np.zeros(y_true.shape)
    pred_labels[np.where(preds > 0.5)] = 1

    metrics = {
        "f2_score": f2_score(y_true, pred_labels),
        "accuracy": _metrics.accuracy_score(y_true, pred_labels),
        "root_mean_squared_error": _metrics.mean_squared_error(y_true, preds, squared=False),
        "precision": _metrics.precision_score(y_true, pred_labels, zero_division=0),
        "recall": _metrics.recall_score(y_true, pred_labels, zero_division=0),
        "f1_score": _metrics.f1_score(y_true, pred_labels, zero_division=0),
    }
    if use_tune:
        tune.report(**metrics, done=True)

    return metrics
