import React from 'react';
import { format } from 'date-fns';
import IonIcon from 'react-native-vector-icons/Ionicons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, Stack } from '../../components';
import { styled, useTheme } from '../../styles/styled';

import { MaintenanceEvent as MaintenanceEventType } from '../data';

type Props = {
  event: MaintenanceEventType;
};

export default function MaintentenanceEvent({ event }: Props) {
  const theme = useTheme();

  return (
    <Wrapper>
      <Stack axis="y" space="2">
        <Stack axis="x" space="2" justify="between">
          <Stack axis="x" space="2">
            {event.status === 'Irrelevant' && (
              <>
                <IonIcon
                  name="close-circle"
                  size={20}
                  color={theme.colors.chartNegativeLight.value}
                />

                <Text variant="body" color="chartNegativeLight">
                  Invalid prediction
                </Text>
              </>
            )}
            {event.status === 'Completed' && (
              <>
                <IonIcon
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primaryLight.value}
                />

                <Text variant="body" color="primaryLight">
                  Confirmed prediction
                </Text>
              </>
            )}
          </Stack>

          <Text variant="bodySmall" color="textMuted">
            {format(event.date, 'MM.dd.yyyy')}
          </Text>
        </Stack>

        <Stack axis="y" space="3">
          <Stack axis="x" space="1" justify="between">
            <Stack axis="x" space="2" align="center">
              <Avatar source={event.technician.avatar} />
              <Text variant="body">{event.technician.name}</Text>
            </Stack>

            <ContactButton>
              <Text variant="bodySmall">Contact</Text>
            </ContactButton>
          </Stack>

          <Stack axis="x" space="1" align="center">
            <Text variant="bodySmall" color="textMuted">
              Flagged metrics:
            </Text>

            {event.flaggedMetrics.map((metric) => (
              <FlaggedMetric>
                <Stack axis="x" space="1" align="center">
                  <McIcon
                    name="chart-timeline-variant"
                    size={12}
                    color={theme.colors.text.value}
                  />
                  <Text variant="bodyExtraSmall">{metric}</Text>
                </Stack>
              </FlaggedMetric>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {});

const Avatar = styled('Image', {
  width: 28,
  height: 28,
  borderRadius: '$full',
  borderWidth: 1,
  borderColor: '$surfaceClear',
});

const ContactButton = styled('TouchableOpacity', {
  paddingVertical: '$1',
  paddingHorizontal: '$2',
  borderRadius: '$sm',
  backgroundColor: '$primary',
});

const FlaggedMetric = styled('View', {
  paddingVertical: '$1',
  paddingHorizontal: '$2',
  borderRadius: '$md',
  backgroundColor: '$surfaceDistinct',
});
