Group:


```python
x = x.loc[
    (x["action_recommendation_category"] == "arc02")
    & (x["usage_type"] == "ut011")
    & (x["equipment_category"] == "tp007")
]
```

Results:

```json
Dataset size: 2679

{'f2_score': 0.9266016934856477, 'accuracy': 0.7372123029711257, 'root_mean_squared_error': 0.435462959032093, 'precision': 0.7310452676225468, 'recall': 0.9931311580997007, 'f1_score': 0.8420688984816979, 'base_line_f2': 0.922994552294908, 'base_line_accuracy': 0.7058557678895243, 'done': True, 'time_this_iter_s': 0.19561004638671875, 'timesteps_total': None, 'episodes_total': None, 'training_iteration': 1, 'trial_id': '50039b58', 'experiment_id': 'fddf436fa06d4a589724db954d88e36f', 'date': '2021-11-20_17-34-15', 'timestamp': 1637422455, 'time_total_s': 0.19561004638671875, 'pid': 40906, 'hostname': 'Villes-MacBook-Pro-3.local', 'node_ip': '127.0.0.1', 'config': {'objective': 'binary:logistic', 'eval_metric': 'auc', 'max_depth': 2, 'min_child_weight': 1, 'subsample': 0.9102547224189284, 'eta': 0.1650764574639888}, 'time_since_restore': 0.19561004638671875, 'timesteps_since_restore': 0, 'iterations_since_restore': 1, 'experiment_tag': '15_eta=0.16508,eval_metric=auc,max_depth=2,min_child_weight=1,objective=binary:logistic,subsample=0.91025'}
2021-11-20,17:35:01.414 INFO {model} [_single_train] {'f2_score': 0.9266016934856477, 'accuracy': 0.7372123029711257, 'root_mean_squared_error': 0.435462959032093, 'precision': 0.7310452676225468, 'recall': 0.9931311580997007, 'f1_score': 0.8420688984816979, 'base_line_f2': 0.922994552294908, 'base_line_accuracy': 0.7058557678895243}

```


Group:
```python
x = x.loc[
        (x["action_recommendation_category"] == "arc02")
        & (x["usage_type"] == "ut011")
        & (x["equipment_category"] == "tp002")
    ]
```


Results:

```json
Dataset size: 9749

2021-11-20,17:37:47.227 INFO {model} [run] {'f2_score': 0.9368946075659549, 'accuracy': 0.7480767257370644, 'root_mean_squared_error': 0.49865845396849373, 'precision': 0.7480767257370644, 'recall': 1.0, 'f1_score': 0.8558816300108554, 'base_line_f2': 0.9368946075659549, 'base_line_accuracy': 0.7480767257370644, 'done': True, 'time_this_iter_s': 0.20576095581054688, 'timesteps_total': None, 'episodes_total': None, 'training_iteration': 1, 'trial_id': 'b331ac1a', 'experiment_id': '2793305fdc1d46a4b694a98e170473d7', 'date': '2021-11-20_17-37-01', 'timestamp': 1637422621, 'time_total_s': 0.20576095581054688, 'pid': 41253, 'hostname': 'Villes-MacBook-Pro-3.local', 'node_ip': '127.0.0.1', 'config': {'objective': 'binary:logistic', 'eval_metric': 'auc', 'max_depth': 1, 'min_child_weight': 3, 'subsample': 0.5320984353627971, 'eta': 0.0009568292117240741}, 'time_since_restore': 0.20576095581054688, 'timesteps_since_restore': 0, 'iterations_since_restore': 1, 'experiment_tag': '21_eta=0.00095683,eval_metric=auc,max_depth=1,min_child_weight=3,objective=binary:logistic,subsample=0.5321'}
2021-11-20,17:37:47.396 INFO {model} [_single_train] {'f2_score': 0.9368946075659549, 'accuracy': 0.7480767257370644, 'root_mean_squared_error': 0.49865845396849373, 'precision': 0.7480767257370644, 'recall': 1.0, 'f1_score': 0.8558816300108554, 'base_line_f2': 0.9368946075659549, 'base_line_accuracy': 0.7480767257370644}
```

Group:
```python
x = x.loc[
        (x["action_recommendation_category"] == "arc03")
        & (x["usage_type"] == "ut007")
        & (x["equipment_category"] == "tp006")
    ]
```


Results:

```json
Dataset size: 2179

```json
{'f2_score': 0.9321484939325287, 'accuracy': 0.7338257935252557, 'root_mean_squared_error': 0.3828749059274257, 'precision': 0.7338257935252557, 'recall': 1.0, 'f1_score': 0.8462320003987468, 'base_line_f2': 0.9321484939325287, 'base_line_accuracy': 0.7338257935252557, 'done': True, 'time_this_iter_s': 0.16236495971679688, 'timesteps_total': None, 'episodes_total': None, 'training_iteration': 1, 'trial_id': '3c68b4e2', 'experiment_id': 'c76c095dcef24f678fdd870defe74dcf', 'date': '2021-11-20_17-40-50', 'timestamp': 1637422850, 'time_total_s': 0.16236495971679688, 'pid': 41510, 'hostname': 'Villes-MacBook-Pro-3.local', 'node_ip': '127.0.0.1', 'config': {'objective': 'binary:logistic', 'eval_metric': 'aucpr', 'max_depth': 1, 'min_child_weight': 1, 'subsample': 0.7249402592358296, 'eta': 0.20464198153443966}, 'time_since_restore': 0.16236495971679688, 'timesteps_since_restore': 0, 'iterations_since_restore': 1, 'experiment_tag': '6_eta=0.20464,eval_metric=aucpr,max_depth=1,min_child_weight=1,objective=binary:logistic,subsample=0.72494'}
2021-11-20,17:41:37.643 INFO {model} [_single_train] {'f2_score': 0.9321484939325287, 'accuracy': 0.7338257935252557, 'root_mean_squared_error': 0.3828749059274257, 'precision': 0.7338257935252557, 'recall': 1.0, 'f1_score': 0.8462320003987468, 'base_line_f2': 0.9321484939325287, 'base_line_accuracy': 0.7338257935252557}
```