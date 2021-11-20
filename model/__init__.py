import numpy as np
from ray import tune
import sklearn.metrics as _metrics
from sklearn.utils import compute_sample_weight

from custom.score import f2_score

def conver_probs_to_label(preds):
    pred_labels = np.zeros(preds.shape)
    pred_labels[np.where(preds > 0.5)] = 1
    return pred_labels.astype(int)

def metrics(y_true, preds):
    # NOTE: transfer preds to labels
    pred_labels = conver_probs_to_label(preds)

    sample_weights = compute_sample_weight({0: 8.1, 1: 1.14}, y_true)

    metrics = {
        "f2_score": f2_score(y_true, pred_labels),
        "accuracy": _metrics.accuracy_score(y_true, pred_labels),
        "root_mean_squared_error": _metrics.mean_squared_error(y_true, preds, squared=False),
        "precision": _metrics.precision_score(y_true, pred_labels, zero_division=0),
        "recall": _metrics.recall_score(y_true, pred_labels, zero_division=0),
        "f1_score": _metrics.f1_score(y_true, pred_labels, zero_division=0),
        "base_line_f2": f2_score(y_true, np.ones(y_true.shape)),
        "base_line_accuracy": _metrics.accuracy_score(y_true, np.ones(y_true.shape)),
        "logloss": _metrics.log_loss(y_true, preds),
        "logloss_weighted": _metrics.log_loss(y_true, preds, sample_weight=sample_weights),
    }

    return metrics
