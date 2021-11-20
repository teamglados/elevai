import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeIcon from 'react-native-vector-icons/Feather';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { Incident } from '../data';
import { Text, Stack } from '../../components';
import { styled, useTheme } from '../../styles/styled';

type Props = {
  data: Incident;
};

export default function IncidentCard({ data }: Props) {
  const navigation: any = useNavigation();
  const theme = useTheme();

  return (
    <Wrapper
      onPress={() => navigation.navigate('Incident', { id: data.id })}
      activeOpacity={0.8}
    >
      <Stack axis="x" space="3" align="center">
        <Status>
          {data.accuracy < 60 ? (
            <McIcon
              name="shield-search"
              size={18}
              color={theme.colors.primaryLight.value}
            />
          ) : (
            <McIcon
              name="shield-alert"
              size={18}
              color={theme.colors.chartNegativeLight.value}
            />
          )}
        </Status>

        <Stack axis="y" space="1">
          <Text variant="body">{data.name}</Text>
          <Text variant="bodySmall" color="textMuted">
            {data.location}
          </Text>
        </Stack>
      </Stack>

      <Chevron name="chevron-right" size={18} color="#444" />
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  flex: 1,
  backgroundColor: '$surface',
  padding: '$3',
  borderRadius: '$lg',
  overflow: 'hidden',
});

const Status = styled('View', {
  width: 38,
  height: 38,
  borderRadius: '$full',
  backgroundColor: '$surface',
  flexCenter: 'column',
});

const Chevron = styled(FeIcon, {
  position: 'absolute',
  top: 8,
  right: 8,
});
