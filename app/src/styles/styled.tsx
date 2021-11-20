import { StyleSheet } from 'react-native';
import { createStitches } from 'stitches-native';
import type * as Stitches from 'stitches-native';

import { typography, size, shadow, flexCenter, absoluteFill } from './utils';

const { styled, css, theme, createTheme, useTheme, ThemeProvider, config } =
  createStitches({
    theme: {
      colors: {
        primary: '#0071b9',
        primaryLight: '#90d4ff',
        chartNegative: '#851d1d',
        chartNegativeLight: '#fc6161',
        chartPositiveDark: '#001522',
        chartPositive: '#003758',
        chartPositiveLight: '#90d4ff',
        text: '#ffffff',
        textInvert: '#000000',
        background: '#000000',
        overlay: 'rgba(0, 0, 0, 0.5)',
        surface: 'rgba(150, 150, 150, 0.12)',
      },
      space: {
        none: 0,
        1: 4,
        2: 8,
        3: 16,
        4: 24,
        5: 32,
        6: 40,
        7: 56,
        8: 72,
        9: 96,
      },
      sizes: {
        hairlineWidth: StyleSheet.hairlineWidth,
      },
      radii: {
        sm: 4,
        md: 8,
        lg: 16,
        full: 999,
      },
    },
    utils: {
      typography,
      size,
      shadow,
      flexCenter,
      absoluteFill,
    },
  });

export type CSS = Stitches.CSS<typeof config>;
export type Theme = typeof theme;

export { styled, css, createTheme, theme, useTheme, ThemeProvider };
