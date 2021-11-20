import React from 'react';
import FeIcon from 'react-native-vector-icons/Feather';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Incident, maintenanceHistory, metrics } from '../data';
import { Text, Stack, CollapseSection, Spacer } from '../../components';
import { styled, useTheme } from '../../styles/styled';
import LineChart from './LineChart';
import IncidentFeatures from './IncidentFeatures';
import MaintentenanceEvent from './MaintenanceEvent';

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
            <FeIcon name="box" size={16} color="#000" />
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
          <Headline variant="headline">Incident details</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              <Text variant="bodySmall">{data.location}</Text>

              <CollapseSection title="Maintenance history" icon="history">
                <Text variant="body">TODO</Text>
              </CollapseSection>

              <Text variant="bodySmall">More stuff here</Text>
            </Stack>
          </Card>
        </Content>

        <Content>
          <Headline variant="headline">Maintenance history</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              {maintenanceHistory.map((event, index) => (
                <MaintentenanceEventWrapper
                  last={index === maintenanceHistory.length - 1 ? 'y' : 'n'}
                >
                  <MaintentenanceEvent key={event.id} event={event} />
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
          {metrics.map((metric) => (
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
                  <LineChart />
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
  paddingTop: '$3',
});

const Content = styled('View', {
  paddingHorizontal: '$2',
});

const Card = styled('View', {
  padding: '$3',
  backgroundColor: '$surface',
  borderRadius: '$md',
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
  padding: 3,
});

const IconWrapper = styled('View', {
  width: 32,
  height: 32,
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
