import React from 'react';
import { ViroText, ViroTextProps } from '@viro-community/react-viro';

import { styled, Theme, useTheme } from '../styles/styled';
import { themeProp } from '../styles/helpers';

import {
  FONT_SIZE_FACTOR,
  typographyARVariants,
  TypographyVariant,
} from '../styles/utils';

export const Text = styled('Text', {
  color: '$text',
  fontSize: 16,
  variants: {
    ...themeProp('color', 'colors', (value) => ({
      color: value,
    })),
    variant: {
      body: { typography: '$body' },
      bodySmall: { typography: '$bodySmall' },
      bodyExtraSmall: { typography: '$bodyExtraSmall' },
      headline: { typography: '$headline' },
      title1: { typography: '$title1' },
      title2: { typography: '$title2' },
      title3: { typography: '$title3' },
    },
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export function ARText({
  children,
  variant,
  color,
  scale,
  style,
  ...rest
}: Omit<ViroTextProps, 'text'> & {
  children: string;
  variant: TypographyVariant;
  color?: keyof Theme['colors'];
}) {
  const theme = useTheme();

  const _style = React.useMemo(
    () => ({
      ...typographyARVariants[variant],
      color: theme.colors[color || 'text'],
      ...style,
    }),
    [variant, color],
  );

  const _scale = scale
    ? scale.map((value) => value / FONT_SIZE_FACTOR)
    : [1, 1, 1];

  return <ViroText {...rest} text={children} style={_style} scale={_scale} />;
}
