import { theme, useTheme } from './styled';

type Theme = typeof theme;
type ThemeKey = keyof Theme;

export function themeProp<P extends string, T extends ThemeKey>(
  prop: P,
  themeKey: T,
  getStyles: (token: string) => any,
) {
  return Object.values(theme[themeKey]).reduce(
    (acc, { token }) => {
      acc[prop][token] = getStyles(`$${token}`);
      return acc;
    },
    { [prop]: {} },
  ) as {
    [prop in P]: { [token in keyof Theme[T]]: any }; // TODO: fix any
  };
}

export function useScreenOptions() {
  const theme = useTheme();

  return {
    headerStyle: {
      backgroundColor: theme.colors.background.value,
    },
    headerTitleStyle: {
      color: theme.colors.text.value,
    },
    // headerBackTitleStyle: {
    //   color: theme.colors.primary.value,
    // },
  };
}
