from sklearn.utils import compute_sample_weight
import sklearn.metrics as _metrics
import numpy as np

from ray import tune

from utils.metrics import f2_score

def conver_probs_to_label(preds):
    pred_labels = np.zeros(preds.shape)
    pred_labels[np.where(preds > 0.5)] = 1
    return pred_labels.astype(int)

def metrics(y_true, preds):
    # NOTE: transfer preds to labels
    pred_labels = conver_probs_to_label(preds)

    sample_weights = compute_sample_weight({0: 8.1, 1: 1.14}, y_true)

    computed_metrics = {
        "f2_score": f2_score(y_true, pred_labels),
        "f1_score": _metrics.f1_score(y_true, pred_labels, zero_division=0),
        "accuracy": _metrics.accuracy_score(y_true, pred_labels),
        "precision": _metrics.precision_score(y_true, pred_labels, zero_division=0),
        "recall": _metrics.recall_score(y_true, pred_labels, zero_division=0),
        "rmse": _metrics.mean_squared_error(y_true, preds, squared=False),
        "base_line_f2": f2_score(y_true, np.ones(y_true.shape)),
        "base_line_accuracy": _metrics.accuracy_score(y_true, np.ones(y_true.shape)),
        "logloss": _metrics.log_loss(y_true, preds),
        "logloss_weighted": _metrics.log_loss(y_true, preds, sample_weight=sample_weights),
    }

    return computed_metrics
