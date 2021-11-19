import React from 'react';
import { Text } from 'react-native';
import { styled } from '../styled';

export default function IntroScreen() {
  return (
    <Wrapper>
      <Title>Intro</Title>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  flexCenter: 'column',
});

const Title = styled('Text', {});
