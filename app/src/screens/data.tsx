import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';

export type Incident = {
  id: number;
  location: string;
  name: string;
  features: any;
};

export type FeatureType =
  | 'speed'
  | 'load'
  | 'usage'
  | 'floors'
  | 'speed'
  | 'earea'
  | 'ecategory';

export type Feature = {
  id: number;
  name: string;
  type: FeatureType;
  icon: React.ReactNode;
};

export const incidents: Incident[] = [
  { id: 1, location: 'Spektri Business Park', name: 'Elev X1', features: {} },
  { id: 2, location: 'Spektri Business Park', name: 'Elev X2', features: {} },
  { id: 3, location: 'Redi Shopping Center', name: 'Elev ZS4', features: {} },
  { id: 4, location: 'Redi Shopping Center', name: 'Elev ZS5', features: {} },
  { id: 5, location: 'Redi Shopping Center', name: 'Elev ZS6', features: {} },
  { id: 6, location: 'Tripla Shopping Center', name: 'Elev AV9', features: {} },
  { id: 7, location: 'Clarion Hotel', name: 'Elev XY3', features: {} },
];

export const features: Feature[] = [
  {
    id: 1,
    type: 'speed',
    name: 'Speed',
    icon: <MCIcon name="speedometer" size={18} color="#90d4ff" />,
  },
  {
    id: 2,
    type: 'load',
    name: 'Load',
    icon: <MCIcon name="weight-gram" size={18} color="#90d4ff" />,
  },
  {
    id: 3,
    type: 'usage',
    name: 'Usage',
    icon: <IonIcon name="md-download-outline" size={18} color="#90d4ff" />,
  },
  {
    id: 4,
    type: 'floors',
    name: 'Floors',
    icon: <MCIcon name="format-list-numbered-rtl" size={18} color="#90d4ff" />,
  },
  {
    id: 6,
    type: 'earea',
    name: 'Area',
    icon: <MCIcon name="floor-plan" size={18} color="#90d4ff" />,
  },
  {
    id: 7,
    type: 'ecategory',
    name: 'Category',
    icon: <MdIcon name="category" size={18} color="#90d4ff" />,
  },
];
