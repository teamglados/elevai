import React from 'react';
import { StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';

import { styled } from '../../styles/styled';
import { Text } from '../../components';
import { setupImageTargets } from './utils';
import { useARStore } from './state';
import Scene from './Scene';

export default function ARScreen() {
  const anchor = useARStore((state) => state.anchor);

  return (
    <Wrapper>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: Scene }}
        style={styles.container}
      />

      {!anchor && (
        <BadgeWrapper>
          <Badge>
            <Text variant="body">Detecting...</Text>
          </Badge>
        </BadgeWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const BadgeWrapper = styled('View', {
  position: 'absolute',
  bottom: 32,
  left: 0,
  right: 0,
  flexCenter: 'row',
});

const Badge = styled('View', {
  padding: 16,
  backgroundColor: '$overlay',
  borderRadius: '$full',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

setupImageTargets();
