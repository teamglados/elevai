import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { VibrancyView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

import type { Elevator } from './data';
import { Text, Stack } from '../../components';
import { styled } from '../../styles/styled';
import Chart from './Chart';

type Props = {
  data: Elevator;
};

export default function ListItem({ data }: Props) {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Body>
        <Stack axis="y" space="1">
          <Text variant="body">{data.name}</Text>
          <Text variant="bodySmall">{data.location}</Text>
        </Stack>
      </Body>

      <Chart />

      <ARButton onPress={() => navigation.navigate('AR' as any)}>
        <IconWrapper blurType="light">
          <Icon name="box" size={24} color="#fff" />
          <Text variant="bodyExtraSmall" color="text">
            AR
          </Text>
        </IconWrapper>
      </ARButton>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$surface',
  margin: '$2',
  borderRadius: '$lg',
  overflow: 'hidden',
});

const Body = styled('View', {
  padding: '$3',
});

const ARButton = styled('TouchableOpacity', {
  borderWidth: 1,
  borderColor: '$surface',
  borderRadius: 12,
  padding: '$1',
  position: 'absolute',
  bottom: 8,
  right: 8,
});

const IconWrapper = styled(VibrancyView as any, {
  width: 48,
  height: 48,
  flexCenter: 'column',
  borderRadius: '$md',
  alignSelf: 'flex-start',
});
