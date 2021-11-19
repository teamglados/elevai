from sklearn.metrics import precision_score, recall_score

def fb_score(beta, y_true, y_pred):
    '''
    Computes the f-beta score for binary classification given
    true labels and predicted labels.

    @param beta: Beta value
    @param y_true: True labels
    @param y_pred: Predicted labels
    '''
    p = precision_score(y_true, y_pred)
    r = recall_score(y_true, y_pred)
    score = (1 + beta**2) * (p * r) / ((beta**2 * p) + r)
    return score

def f2_score(y_true, y_pred):
    '''
    Computes the F2 score for binary classification given
    true labels and predicted labels.

    @param y_true: True labels
    @param y_pred: Predicted labels
    '''
    return fb_score(2, y_true, y_pred)

__all__ = [
    'fb_score',
    'f2_score'
]
