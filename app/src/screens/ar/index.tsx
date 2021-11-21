import React from 'react';
import { StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import FeIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { styled } from '../../styles/styled';
import { Stack, Text } from '../../components';
import { setupAR } from './utils';
import { useARStore } from './state';
import Scene from './Scene';

export default function ARScreen({ navigation }: { navigation: any }) {
  const anchor = useARStore((state) => state.anchor);
  const setAnchor = useARStore((state) => state.setAnchor);

  function goBack() {
    navigation.goBack();
    setAnchor(null);
  }

  React.useEffect(() => {
    setupAR();
  }, []);

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
            <Stack axis="x" space="2" align="center">
              <FeIcon name="box" size={20} color="#fff" />
              <Text variant="subtitle">Find target surface</Text>
            </Stack>
          </Badge>
        </BadgeWrapper>
      )}

      <BackButton onPress={goBack}>
        <AntIcon name="back" size={24} color="#fff" />
      </BackButton>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

const BadgeWrapper = styled('View', {
  position: 'absolute',
  bottom: 40,
  left: 0,
  right: 0,
  flexCenter: 'row',
});

const Badge = styled('View', {
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: '$overlay',
  borderRadius: '$full',
});

const BackButton = styled('TouchableOpacity', {
  position: 'absolute',
  top: 40,
  left: 16,
  backgroundColor: '$overlay',
  borderRadius: '$md',
  padding: '$3',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
