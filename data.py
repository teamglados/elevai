import typing
from collections import defaultdict

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


WHITE_LISTED_CLASSES = [
    'action_recommendation_id',
    'action_recommendation_type',
    'action_recommendation_category',
    'equipment_area',
    'equipment_category',
    'floors_category',
    'load_category',
    'speed_category',
    'usage_type',
]

LABEL_CLASS = "feedback"


def get_data(path: str = "data/train.csv", split_size: float=0.1):
    df = pd.read_csv(path)
    df = df.drop_duplicates()

    sampled_df = sample_data(df)

    x = sampled_df[WHITE_LISTED_CLASSES]
    y = sampled_df[LABEL_CLASS]


    label_encoder = defaultdict(LabelEncoder)

    # TODO do we have all labels in the dataset after downsampling?
    x = x.apply(lambda feature: label_encoder[feature.name].fit_transform(feature))


    return train_test_split(x, y, test_size=split_size)

def sample_data(df: pd.DataFrame) -> pd.DataFrame:
    sampler = RandomUnderSampler(sampling_strategy='not minority', random_state=1)
    df, _ = sampler.fit_resample(df, df[LABEL_CLASS])
    return df