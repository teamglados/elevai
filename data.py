from collections import defaultdict

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from imblearn.combine import SMOTEENN
from sklearn.preprocessing import LabelEncoder

from utils import get_logger

LOGGER = get_logger(__name__)


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

LABEL_ENCODER = defaultdict(LabelEncoder)


def get_data(path: str):
    df = pd.read_csv(path)
    # df = df.drop_duplicates()

    x = df[CATEGORICAL_FEATURES + NUMBERIC_FEATURES]
    y = df[LABEL_CLASS]

    # x = x.loc[
    #     (x["action_recommendation_category"] == "arc03")
    #     & (x["usage_type"] == "ut011")
    #     & (x["equipment_category"] == "ec020")
    # ]
    # y = y.loc[x.index]

    x[CATEGORICAL_FEATURES] = x[CATEGORICAL_FEATURES].apply(
        lambda feature: LABEL_ENCODER[feature.name].fit_transform(feature)
    )

    LOGGER.info(f"Dataset size: {x.shape[0]}")
    return x, y


def get_test_data(path):
    df = pd.read_csv(path)

    x = df[CATEGORICAL_FEATURES + NUMBERIC_FEATURES]

    x[CATEGORICAL_FEATURES] = x[CATEGORICAL_FEATURES].apply(
        lambda feature: LABEL_ENCODER[feature.name].fit_transform(feature)
    )

    LOGGER.info(f"Dataset size: {x.shape[0]}")
    return x, df["case_id"]


def random_under_sampler(x, y):
    sampler = RandomUnderSampler(sampling_strategy="not minority", random_state=1)
    return sampler.fit_resample(x, y)


def smoteenn(x, y):
    over_sampler = SMOTEENN(random_state=1)
    return over_sampler.fit_resample(x, y)
