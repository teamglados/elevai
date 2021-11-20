from collections import defaultdict

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from imblearn.combine import SMOTEENN
from sklearn.preprocessing import LabelEncoder



CATEGORICAL_FEATURES = [
    "action_recommendation_id",
    "action_recommendation_type",
    "action_recommendation_category",
    "equipment_area",
    "equipment_category",
    "usage_type",
]

NUMBERIC_FEATURES = ["speed_category", "load_category", "floors_category"]

LABEL_CLASS = "feedback"


def get_data(path: str, split_size: float = 0.1):
    df = pd.read_csv(path)
    df = df.drop_duplicates()

    x = df[CATEGORICAL_FEATURES + NUMBERIC_FEATURES]
    y = df[LABEL_CLASS]

    label_encoder = defaultdict(LabelEncoder)

    x[CATEGORICAL_FEATURES] = x[CATEGORICAL_FEATURES].apply(
        lambda feature: label_encoder[feature.name].fit_transform(feature)
    )

    return x, y


def random_under_sampler(x, y):
    sampler = RandomUnderSampler(sampling_strategy="not minority", random_state=1)
    return sampler.fit_resample(x, y)


def smoteenn(x, y):
    over_sampler = SMOTEENN(random_state=1)
    return over_sampler.fit_resample(x, y)

