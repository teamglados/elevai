import { StyleSheet } from 'react-native';
import { createStitches } from 'stitches-native';
import type * as Stitches from 'stitches-native';

import { typography, size, shadow, flexCenter, absoluteFill } from './utils';

const { styled, css, theme, createTheme, useTheme, ThemeProvider, config } =
  createStitches({
    theme: {
      colors: {
        // Palette
        blue100: '#ab9cf7',
        blue500: '#301b96',
        blue900: '#0D0630',
        black: '#222',
        white: '#fff',

        primary: '$blue500',
        primaryDark: '$blue900',
        primaryLight: '$blue100',
        secondary: '#8BBEB2',
        secondaryDark: '#384d48',
        secondaryLight: '#d9fff6',
        background: '$white',
        text: '$black',
      },
      space: {
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
        lg: 24,
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

export { styled, css, createTheme, theme, useTheme, ThemeProvider };
