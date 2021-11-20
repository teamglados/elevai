import React from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroFlexView,
  ViroARImageMarker,
  ViroNode,
  ViroImage,
  ViroAnimations,
} from '@viro-community/react-viro';

import type { Anchor } from '../../../types';
import { useARStore } from './state';
import { ARText } from '../../components';

export default function MainScene() {
  const anchor = useARStore((state) => state.anchor);
  const setAnchor = useARStore((state) => state.setAnchor);

  function handleTrackingUpdated(state: any, reason: any) {
    console.log('> Tracking updated', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log('> Tracking: Normal');
    } else if (state === ViroConstants.TRACKING_NONE) {
      console.log('> Tracking: None');
    }
  }

  return (
    <ViroARScene
      onTrackingUpdated={handleTrackingUpdated}
      anchorDetectionTypes="PlanesVertical"
    >
      <ViroARImageMarker
        target="logo"
        onAnchorFound={setAnchor}
        pauseUpdates={!!anchor}
      >
        {!!anchor && <SceneContent anchor={anchor} />}
      </ViroARImageMarker>
    </ViroARScene>
  );
}

function SceneContent({ anchor }: { anchor: Anchor }) {
  const width = 4;
  const height = 2;

  return (
    <ViroNode key="content">
      <ViroNode
        position={[0, 0, 0]}
        scale={[0.05, 0.05, 0.05]}
        opacity={0}
        animation={{ name: 'animateContent', run: true }}
      >
        <ViroFlexView
          rotation={[-90, 0, 0]}
          style={styles.content}
          width={width}
          height={height * 2}
        >
          <ARText variant="body">Statistics</ARText>
          <ViroImage
            width={width}
            height={height}
            source={require('../../assets/graph.png')}
          />
        </ViroFlexView>
      </ViroNode>
    </ViroNode>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'column',
  },
});

ViroAnimations.registerAnimations({
  animateContent: {
    properties: {
      positionX: 0.1,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 500,
    delay: 2000,
  },
});
