import React from 'react';
import FeIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Incident, maintenanceHistory } from '../data';
import { Text, Stack, CollapseSection, Spacer } from '../../components';
import { styled } from '../../styles/styled';
import LineChart from './LineChart';
import IncidentFeatures from './IncidentFeatures';
import { format } from 'date-fns';

type Props = {
  data: Incident;
};

export default function IncidentDetails({ data }: Props) {
  const navigation: any = useNavigation();

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
                <Stack axis="y" space="2">
                  {maintenanceHistory.map((event) => (
                    <Stack
                      key={event.id}
                      axis="x"
                      space="2"
                      align="center"
                      justify="between"
                    >
                      <Text variant="body">Event</Text>
                      <Text variant="bodySmall" color="textMuted">
                        {format(event.date, 'MM.dd.yyyy')}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </CollapseSection>

              <Text variant="bodySmall">More stuff here</Text>
            </Stack>
          </Card>
        </Content>

        <Content>
          <Headline variant="headline">Something</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              <Text variant="body">Stuff</Text>
              <Text variant="bodySmall">Something</Text>
            </Stack>
          </Card>
        </Content>

        <Content>
          <Headline variant="headline">Another</Headline>
        </Content>

        <Spacer axis="y" space="2" />

        <Content>
          <Card>
            <Stack axis="y" space="3">
              <Text variant="body">Stuff</Text>
              <Text variant="bodySmall">Something</Text>
            </Stack>
          </Card>
        </Content>

        <LineChart />
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
