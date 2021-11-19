from collections import defaultdict

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from imblearn.combine import SMOTEENN
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


def get_data(path: str, split_size: float=0.1):
    df = pd.read_csv(path)
    df = df.drop_duplicates()

    x = df[WHITE_LISTED_CLASSES]
    y = df[LABEL_CLASS]

    label_encoder = defaultdict(LabelEncoder)

    # TODO do we have all labels in the dataset after downsampling?
    x = x.apply(lambda feature: label_encoder[feature.name].fit_transform(feature))

    return train_test_split(x, y, test_size=split_size)

def random_under_sampler(x, y):
    sampler = RandomUnderSampler(sampling_strategy='not minority', random_state=1)
    return sampler.fit_resample(x, y)


def smoteenn(x, y):
    over_sampler = SMOTEENN(random_state=1)
    return over_sampler.fit_resample(x, y)

