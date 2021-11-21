import React from 'react';
import { format } from 'date-fns';
import Collapsible from 'react-native-collapsible';
import IonIcon from 'react-native-vector-icons/Ionicons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeIcon from 'react-native-vector-icons/Feather';

import { Text, Stack } from '../../components';
import { styled, useTheme } from '../../styles/styled';

import { MaintenanceEvent as MaintenanceEventType } from '../data';
import { Animated } from 'react-native';

type Props = {
  event: MaintenanceEventType;
};

export default function MaintentenanceEvent({ event }: Props) {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);

  const chevronAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(chevronAnimation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const chevronRotation = chevronAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Wrapper>
      <Stack axis="y" space="none">
        <Header onPress={() => setOpen((p) => !p)} activeOpacity={0.8}>
          <Stack axis="x" space="2" justify="between">
            <Stack axis="x" space="2" align="center">
              {event.status === 'Irrelevant' && (
                <>
                  <IonIcon
                    name="close-circle"
                    size={20}
                    color={theme.colors.chartNegativeLight.value}
                  />

                  <Text variant="body" color="textMutedLight">
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

                  <Text variant="body" color="textMutedLight">
                    Confirmed prediction
                  </Text>
                </>
              )}
            </Stack>

            <Stack axis="x" space="1">
              <Text variant="bodySmall" color="textMuted">
                {format(event.date, 'MM.dd.yyyy')}
              </Text>

              <Animated.View
                style={{ transform: [{ rotate: chevronRotation }] }}
              >
                <FeIcon name="chevron-down" size={18} color="#444" />
              </Animated.View>
            </Stack>
          </Stack>
        </Header>

        <Collapsible collapsed={!isOpen}>
          <Body>
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
                  <FlaggedMetric key={metric}>
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
          </Body>
        </Collapsible>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {});

const Header = styled('TouchableOpacity', {});

const Body = styled('View', {
  paddingTop: '$3',
});

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
