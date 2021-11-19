
import numpy as np
from ray import tune
from sklearn.metrics import accuracy_score

from custom.score import f2_score

def metrics(test_y, preds, use_tune):
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