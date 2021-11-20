import { CSSProperties } from 'react';
import { PixelRatio, StyleSheet } from 'react-native';
import type * as Stitches from 'stitches-native';

export type TypographyVariant =
  | 'body'
  | 'bodySmall'
  | 'bodyExtraSmall'
  | 'headline'
  | 'title1'
  | 'title2'
  | 'title3';

type TypographyVariantVar = `$${TypographyVariant}`;

const typographyVariants: {
  [variant in TypographyVariantVar]: CSSProperties;
} = {
  $body: {
    fontSize: 16,
    fontWeight: '400',
  },
  $bodySmall: {
    fontSize: 14,
    fontWeight: '400',
  },
  $bodyExtraSmall: {
    fontSize: 10,
    fontWeight: '500',
  },
  $headline: {
    fontSize: 18,
    fontWeight: '700',
  },
  $title1: {
    fontSize: 64,
    fontWeight: '700',
  },
  $title2: {
    fontSize: 48,
    fontWeight: '500',
  },
  $title3: {
    fontSize: 26,
    fontWeight: '700',
  },
};

export const FONT_SIZE_FACTOR = PixelRatio.get();

export const typographyARVariants: {
  [variant in TypographyVariant]: CSSProperties;
} = {
  body: {
    fontFamily: 'San Fransisco',
    fontSize: 16 * FONT_SIZE_FACTOR,
  },
  bodySmall: {
    fontFamily: 'San Fransisco',
    fontSize: 14 * FONT_SIZE_FACTOR,
  },
  bodyExtraSmall: {
    fontFamily: 'San Fransisco',
    fontSize: 8 * FONT_SIZE_FACTOR,
  },
  headline: {
    fontFamily: 'San Fransisco',
    fontSize: 18 * FONT_SIZE_FACTOR,
    fontWeight: '700',
  },
  title1: {
    fontFamily: 'San Fransisco',
    fontSize: 64 * FONT_SIZE_FACTOR,
    fontWeight: '700',
  },
  title2: {
    fontFamily: 'San Fransisco',
    fontSize: 48 * FONT_SIZE_FACTOR,
    fontWeight: '500',
  },
  title3: {
    fontFamily: 'San Fransisco',
    fontSize: 26 * FONT_SIZE_FACTOR,
    fontWeight: '700',
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
