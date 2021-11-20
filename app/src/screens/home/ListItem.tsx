import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeIcon from 'react-native-vector-icons/Feather';

import type { Incident } from '../data';
import { Text, Stack } from '../../components';
import { styled } from '../../styles/styled';

type Props = {
  data: Incident;
};

export default function ListItem({ data }: Props) {
  const navigation: any = useNavigation();

  return (
    <Wrapper
      onPress={() => navigation.navigate('Incident', { id: data.id })}
      activeOpacity={0.8}
    >
      <Stack axis="y" space="1">
        <Text variant="body">{data.name}</Text>
        <Text variant="bodySmall">{data.location}</Text>
      </Stack>

      <Chevron name="chevron-right" size={18} color="#444" />
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  flex: 1,
  backgroundColor: '$surface',
  margin: '$2',
  padding: '$3',
  borderRadius: '$lg',
  overflow: 'hidden',
});

const Chevron = styled(FeIcon, {
  position: 'absolute',
  top: 8,
  right: 8,
});
