import React from 'react';
import { clamp, noop } from 'lodash';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroFlexView,
  ViroARImageMarker,
  ViroNode,
  ViroImage,
  ViroAnimations,
  ViroAmbientLight,
  Viro3DObject,
} from '@viro-community/react-viro';

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
      anchorDetectionTypes="PlanesHorizontal"
    >
      <ViroARImageMarker
        target="logo"
        onAnchorFound={setAnchor}
        pauseUpdates={!!anchor}
      >
        {/* {!!anchor && <SceneContent anchor={anchor} />} */}
        {!!anchor && <Elevator />}
      </ViroARImageMarker>
    </ViroARScene>
  );
}

function Elevator() {
  const [guideVisible, setGuideVisible] = React.useState(false);
  const [guideAnim, setGuideAnim] = React.useState('hideGuide');
  const [scale, setScale] = React.useState([0.001, 0.001, 0.001]);
  const ref = React.useRef<any>();

  const aspectRatio = 1.26;
  const guideWidth = 4;
  const guideHeight = guideWidth / aspectRatio;

  function handlePinch(pinchState: any, scaleFactor: number) {
    const newScale = [
      clamp(scale[0] * scaleFactor, 0.001, 0.01),
      clamp(scale[1] * scaleFactor, 0.001, 0.01),
      clamp(scale[2] * scaleFactor, 0.001, 0.01),
    ];

    if (pinchState === 3) {
      setScale(newScale);
    } else {
      if (ref.current) ref.current.setNativeProps({ scale: newScale });
    }
  }

  function handleToggleGuide() {
    setGuideVisible(true);
    setGuideAnim(guideAnim === 'hideGuide' ? 'showGuide' : 'hideGuide');
  }

  return (
    <ViroNode>
      <ViroNode
        ref={ref}
        position={[0, 0, 0]}
        scale={scale}
        onDrag={noop}
        onPinch={handlePinch}
        onClick={handleToggleGuide}
      >
        <Viro3DObject
          highAccuracyEvents={true}
          type="OBJ"
          transformBehaviors={['billboardY']}
          dragType="FixedToWorld"
          source={require('../../assets/models/source/elevator.obj')}
          materials={['box']}
        />

        <ViroNode
          position={[160, 60, 0]}
          scale={[50, 50, 50]}
          opacity={0}
          animation={{ name: guideAnim, run: guideVisible }}
        >
          <ViroFlexView
            rotation={[0, 0, 0]}
            style={styles.content}
            width={guideWidth}
            height={guideHeight}
          >
            <ARText variant="body">Statistics</ARText>

            <ViroImage
              width={guideWidth}
              height={guideHeight}
              source={require('../../assets/statistics.png')}
            />
          </ViroFlexView>
        </ViroNode>
      </ViroNode>

      <ViroAmbientLight color="#ffffff" />
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
  showGuide: {
    properties: { opacity: 1.0 },
    easing: 'Linear',
    duration: 500,
  },
  hideGuide: {
    properties: { opacity: 0 },
    easing: 'Linear',
    duration: 500,
  },
});
