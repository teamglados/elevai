import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styled } from '../../styles/styled';
import { incidents } from '../data';
import ListItem from './ListItem';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Wrapper>
      <FlatList
        data={incidents}
        renderItem={({ item }) => <ListItem data={item} />}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});
