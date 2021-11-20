import pandas as pd
import numpy as np

def compute_group_metrics(df, group_names, label_name):
    '''
    Computes metrics for dataframe with binary labels from grouped
    feature columns. Metrics to compute:

    - accuracy

    @param df: Dataframe
    @param group_names: Feature column group names
    @param label_name: Label column name
    '''
    groups = df[group_names].value_counts().to_frame(
        'total_count'
    ).merge(df[df[label_name] == 1][group_names].value_counts().to_frame(
        'tp_count'
    ), how='right', left_index=True, right_index=True
    ).merge(df[df[label_name] == 0][group_names].value_counts().to_frame(
        'fp_count'
    ), how='right', left_index=True, right_index=True)

    # Compute label accuracy
    groups = groups.assign(accuracy=(1 - groups.fp_count / groups.total_count))

    # Return groups with computed metrics
    return groups

def compute_group_index(df, groups, metric_name, l_bound=0.5, h_bound=0.95):
    '''
    Computes group ids for each dataframe row from grouped feature columns
    metric with lower, middle and upper categories specified by bounds. The
    value is assigned as follows:

    - 0 = unknown
    - 1 = row in lower group
    - 2 = row in middle group
    - 3 = row in upper group

    @param df: Dataframe
    @param groups: Computed feature column groups with metrics
    @param metric_name: Group metric name
    @param l_bound: Lower metric bound
    @param h_bound: Upper metric bound
    '''
    lower_group = groups[groups[metric_name] < l_bound].index
    upper_group = groups[groups[metric_name] >= h_bound].index
    middle_group = groups[(
        groups[metric_name] >= l_bound) & (
        groups[metric_name] < h_bound
    )].index
    
    group_names = groups.index.names
    group_index = []

    for i, row in enumerate(df[group_names].values):
        group_index.append(0)
        for j, group in enumerate((
            lower_group,
            middle_group,
            upper_group)):
            for value in group:
                if tuple(row.tolist()) == value:
                    group_index[i] = j + 1
    return group_index

__all__ = [
    'compute_group_metrics',
    'compute_group_index'
]
