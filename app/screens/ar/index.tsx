import React from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';

import Scene from './Scene';

export default function ARScreen() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: Scene }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ViroARTrackingTargets.createTargets({
  poster: {
    source: require('../../assets/logo_target.jpg'),
    orientation: 'Up',
    physicalWidth: 0.06,
  },
});
