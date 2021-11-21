import React from 'react';
import FeIcon from 'react-native-vector-icons/Feather';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { Incident, maintenanceHistory, metrics } from '../data';
import { Text, Stack, Spacer } from '../../components';
import { styled, useTheme } from '../../styles/styled';
import LineChart from './LineChart';
import IncidentFeatures from './IncidentFeatures';
import MaintentenanceEvent from './MaintenanceEvent';
import { format } from 'date-fns';

type Props = {
  data: Incident;
};

export default function IncidentDetails({ data }: Props) {
  const navigation: any = useNavigation();
  const theme = useTheme();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ARButton onPress={() => navigation.navigate('AR', { incident: data })}>
          <IconWrapper>
            <FeIcon name="box" size={14} color="#000" />
            <Text variant="bodyExtraSmall" color="textInvert">
              AR
            </Text>
          </IconWrapper>
        </ARButton>
      ),
    });
  }, [navigation]);

  return (
    <Wrapper>
      <Stack axis="y" space="4">
        <IncidentFeatures />

        <Spacer axis="y" space="6" />

        <Content>
          <Headline variant="headline">Service task details</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              <Stack axis="x" space="2" align="center" justify="between">
                <Stack axis="x" space="2" align="center">
                  <DetailsIcon>
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
                  </DetailsIcon>

                  <Text variant="body" color="textMutedLight">
                    Status
                  </Text>
                </Stack>

                <Text variant="bodySmall" color="textMuted">
                  {data.accuracy < 60 ? 'Needs investigation' : 'Critical'}
                </Text>
              </Stack>

              <Stack axis="x" space="2" align="center" justify="between">
                <Stack axis="x" space="2" align="center">
                  <DetailsIcon>
                    <MdIcon
                      name="location-pin"
                      size={18}
                      color={theme.colors.text.value}
                    />
                  </DetailsIcon>
                  <Text variant="body" color="textMutedLight">
                    Location
                  </Text>
                </Stack>

                <Text variant="bodySmall" color="textMuted">
                  {data.location}
                </Text>
              </Stack>

              <Stack axis="x" space="2" align="center" justify="between">
                <Stack axis="x" space="2" align="center">
                  <DetailsIcon>
                    <McIcon
                      name="clock-alert-outline"
                      size={18}
                      color={theme.colors.text.value}
                    />
                  </DetailsIcon>
                  <Text variant="body" color="textMutedLight">
                    Reported at
                  </Text>
                </Stack>

                <Text variant="bodySmall" color="textMuted">
                  {format(data.reportedAt, 'dd.MM.yyyy (HH:mm)')}
                </Text>
              </Stack>
            </Stack>
          </Card>
        </Content>

        <Content>
          <Headline variant="headline">Service history</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              {maintenanceHistory.map((event, index) => (
                <MaintentenanceEventWrapper
                  key={event.id}
                  last={index === maintenanceHistory.length - 1 ? 'y' : 'n'}
                >
                  <MaintentenanceEvent event={event} />
                </MaintentenanceEventWrapper>
              ))}
            </Stack>
          </Card>
        </Content>

        <Content>
          <Headline variant="headline">Metrics</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Stack axis="y" space="2">
          {metrics.map((metric, index) => (
            <Content key={metric}>
              <Card>
                <Stack axis="x" space="2" align="center">
                  <McIcon
                    name="chart-timeline-variant"
                    size={16}
                    color={theme.colors.text.value}
                  />
                  <Text variant="subtitle">{metric}</Text>
                </Stack>

                <CardChart>
                  <LineChart index={index} />
                </CardChart>
              </Card>
            </Content>
          ))}
        </Stack>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  paddingTop: '$4',
});

const Content = styled('View', {
  paddingHorizontal: '$2',
});

const Card = styled('View', {
  padding: '$3',
  backgroundColor: '$surface',
  borderRadius: '$md',
});

const DetailsIcon = styled('View', {
  width: 32,
  height: 32,
  flexCenter: 'column',
  borderRadius: '$md',
  backgroundColor: '$surfaceDistinct',
});

const CardChart = styled('View', {
  marginHorizontal: '-$3',
  marginBottom: '-$3',
});

const Headline = styled(Text, {
  marginLeft: '$2',
});

const ARButton = styled('TouchableOpacity', {
  borderWidth: 2,
  borderColor: '$surfaceDistinct',
  borderRadius: 12,
  padding: 2,
});

const IconWrapper = styled('View', {
  width: 30,
  height: 30,
  flexCenter: 'column',
  borderRadius: '$md',
  alignSelf: 'flex-start',
  backgroundColor: '$surfaceClear',
});

const MaintentenanceEventWrapper = styled('View', {
  borderBottomColor: '$surfaceDistinct',
  paddingBottom: '$3',

  variants: {
    last: {
      y: {
        borderBottomWidth: 0,
      },
      n: {
        borderBottomWidth: 1,
      },
    },
  },
});
