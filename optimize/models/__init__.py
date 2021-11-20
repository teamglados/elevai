import sklearn.metrics as _metrics
import numpy as np

from ray import tune
from utils.metrics import f2_score

def metrics(y_true, preds, use_tune):
    # NOTE: transfer preds to labels
    pred_labels = np.zeros(y_true.shape)
    pred_labels[np.where(preds > 0.5)] = 1

    computed_metrics = {
        "f2_score": f2_score(y_true, pred_labels),
        "f1_score": _metrics.f1_score(y_true, pred_labels, zero_division=0),
        "accuracy": _metrics.accuracy_score(y_true, pred_labels),
        "precision": _metrics.precision_score(y_true, pred_labels, zero_division=0),
        "recall": _metrics.recall_score(y_true, pred_labels, zero_division=0),
        "rmse": _metrics.mean_squared_error(y_true, preds, squared=False),
    }

    if use_tune:
        tune.report(**computed_metrics, done=True)
    return computed_metrics
