import React from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlaneSelector,
} from '@viro-community/react-viro';

export default function MainScene() {
  const [selectedPlane, setSelectedPlane] = React.useState(null);

  function handleTrackingUpdated(state, reason) {
    console.log('> Tracking updated', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log('> Tracking: Normal');
    } else if (state === ViroConstants.TRACKING_NONE) {
      console.log('> Tracking: None');
    }
  }

  function handlePlaneSelected(plane) {
    console.log('> Plane selected', plane);
    setSelectedPlane(plane);
  }

  console.log('> selectedPlane', selectedPlane);

  return (
    <ViroARScene
      onTrackingUpdated={handleTrackingUpdated}
      anchorDetectionTypes="PlanesVertical"
    >
      <ViroARPlaneSelector
        alignment="Vertical"
        onPlaneSelected={handlePlaneSelected}
      >
        {!!selectedPlane && (
          <ViroText
            text="Glados"
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            style={styles.text}
          />
        )}
      </ViroARPlaneSelector>
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
