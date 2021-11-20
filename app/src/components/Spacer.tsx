import React from 'react';
import { styled, Theme, useTheme } from '../styles/styled';

type Props = {
  space: keyof Theme['space'];
  axis?: 'x' | 'y';
};

export function Spacer({ axis, space }: Props) {
  const theme = useTheme();

  return (
    <SpacerBase
      style={{
        width: axis === 'x' ? theme.space[space].value : undefined,
        height: axis === 'y' ? theme.space[space].value : undefined,
      }}
    />
  );
}

const SpacerBase = styled('View', {
  flexShrink: 0,
});

// @ts-ignore
Spacer.__SPACER__ = true; // This is used to detect spacers inside Stack component

export default Spacer;
