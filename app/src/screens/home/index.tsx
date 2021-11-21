import React from 'react';
import { groupBy } from 'lodash';
import { SectionList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styled } from '../../styles/styled';
import { incidents } from '../data';
import IncidentCard from './IncidentCard';
import { Stack, Text } from '../../components';

/*
- Severity
- Accuracy
*/
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const data = groupBy(incidents, (i) =>
    i.accuracy < 60 ? 'investigate' : 'critical',
  );

  const sections = [
    { title: 'Critical', data: data.critical },
    { title: 'Investigate', data: data.investigate },
  ];

  return (
    <Wrapper>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingTop: 12,
          paddingHorizontal: 8,
        }}
        renderItem={({ item, index, section }) => (
          <SectionItem last={index === section.data.length - 1 ? 'y' : 'n'}>
            <IncidentCard data={item} />
          </SectionItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>
            <Stack axis="y" space="2">
              <Text variant="headline">{title}</Text>
              {title === 'Investigate' && (
                <Text variant="bodySmall" color="textMuted">
                  Maintenance need predicted but upfront investigated is needed.
                </Text>
              )}
            </Stack>
          </SectionHeader>
        )}
      />
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

const SectionHeader = styled('View', {
  marginLeft: '$3',
  marginBottom: '$3',
});

const SectionItem = styled('View', {
  variants: {
    last: {
      y: {
        marginBottom: '$5',
      },
      n: {
        marginBottom: '$2',
      },
    },
  },
});
