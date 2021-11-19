import { CSSProperties } from 'react';
import { StyleSheet } from 'react-native';
import type * as Stitches from 'stitches-native';

type TypographyVariant = 'body' | 'bodySmall' | 'title1' | 'title2' | 'title3';

type TypographyVariantVar = `$${TypographyVariant}`;

const typographyVariants: {
  [variant in TypographyVariantVar]: CSSProperties;
} = {
  $body: {
    fontFamily: '"Open Sans", sans-serif',
    lineHeight: 1.5,
    fontSize: 18,
    fontWeight: 400,
  },
  $bodySmall: {
    fontFamily: '"Open Sans", sans-serif',
    lineHeight: 1.4,
    fontSize: 14,
    fontWeight: 400,
  },
  $title1: {
    fontFamily: '"Playfair Display", serif',
    lineHeight: 1,
    fontSize: 64,
    fontWeight: 700,
    color: '$tertiary',
  },
  $title2: {
    fontFamily: '"Playfair Display", serif',
    lineHeight: 1,
    fontSize: 48,
    fontWeight: 400,
    color: '$tertiary',
  },
  $title3: {
    fontFamily: '"Playfair Display", serif',
    lineHeight: 1,
    fontSize: 26,
    fontWeight: 500,
    color: '$primary',
  },
};

export const typography = (value: TypographyVariantVar) => {
  return typographyVariants[value];
};

export const size = (value: Stitches.PropertyValue<'width'>) => ({
  width: value,
  height: value,
});

export const shadow = (level: 'none' | 'small' | 'medium' | 'large') => {
  return {
    none: {
      elevation: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowColor: '#000',
    },
    small: {
      elevation: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      shadowOpacity: 0.1,
      shadowColor: '#000',
    },
    medium: {
      elevation: 5,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      shadowOpacity: 0.2,
      shadowColor: '#000',
    },
    large: {
      elevation: 10,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      shadowOpacity: 0.4,
      shadowColor: '#000',
    },
  }[level];
};

export const flexCenter = (
  value?: Stitches.PropertyValue<'flexDirection'>,
) => ({
  flexDirection: value || 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const absoluteFill = () => ({
  ...StyleSheet.absoluteFillObject,
});
