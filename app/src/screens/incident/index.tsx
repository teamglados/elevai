import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styled } from '../../styles/styled';
import { Incident, incidents } from '../data';
import IncidentDetails from './IncidentDetails';

export default function IncidentScreen({ route, navigation }: any) {
  const { id } = route.params;
  const incident = incidents.find((incident) => incident.id === id) as Incident;
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: incident.name });
  }, [navigation]);

  return (
    <Wrapper
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <IncidentDetails data={incident} />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
  backgroundColor: '$background',
});
