import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useWindowDimensions } from 'react-native';
import { VibrancyView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

import type { Elevator } from './data';
import { Text, Stack } from '../../components';
import { styled } from '../../styles/styled';
import LineChart from './LineChart';
import BarChart from './BarChart';

type Props = {
  data: Elevator;
};

export default function ListItem({ data }: Props) {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - 16;

  return (
    <Wrapper>
      <Body>
        <Stack axis="y" space="1">
          <Text variant="body">{data.name}</Text>
          <Text variant="bodySmall">{data.location}</Text>
        </Stack>
      </Body>

      <ChartWrapper
        horizontal
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <LineChart />
        <BarChart />
      </ChartWrapper>

      <ARButton onPress={() => navigation.navigate('AR' as any)}>
        <IconWrapper>
          <Icon name="box" size={24} color="#000" />
          <Text variant="bodyExtraSmall" color="textInvert">
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
  top: 8,
  right: 8,
});

const IconWrapper = styled('View', {
  width: 48,
  height: 48,
  flexCenter: 'column',
  borderRadius: '$md',
  alignSelf: 'flex-start',
  backgroundColor: 'rgba(150, 150, 150, 0.5)',
});

const ChartWrapper = styled('ScrollView', {});
