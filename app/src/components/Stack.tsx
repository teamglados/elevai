import React from 'react';
import flattenChildren from 'react-flatten-children';
import { View, ViewStyle } from 'react-native';

import { styled, Theme, useTheme } from '../styles/styled';

type Props = {
  space: keyof Theme['space'];
  axis?: 'x' | 'y';
  fluid?: boolean;
  align?: 'center' | 'start' | 'end' | 'stretch';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  style?: ViewStyle;
  childStyle?: ViewStyle | ((index: number) => ViewStyle);
  children: React.ReactNode;
};

export function Stack({
  children,
  childStyle,
  axis,
  fluid,
  space,
  align,
  justify,
  ...rest
}: Props) {
  const theme = useTheme();

  // Handle `React.Fragments` by flattening children
  const elements = flattenChildren(children).filter((e) =>
    React.isValidElement(e),
  );

  const lastIndex = React.Children.count(elements) - 1;

  return (
    <StackWrapper axis={axis} align={align} justify={justify} {...rest}>
      {elements.map((child, index) => {
        const isLast = index === lastIndex;
        const nextElement = isLast ? null : (elements[index + 1] as any);
        const disableSpacing = nextElement && nextElement.type['__SPACER__'];
        const isSpacer = (child as any).type['__SPACER__'];
        const style = typeof childStyle === 'function' ? childStyle(index) : childStyle; // prettier-ignore
        const margin = disableSpacing ? 0 : theme.space[space].value;

        return React.isValidElement(child) ? (
          // No need to wrap spacer components
          isSpacer ? (
            React.cloneElement(child)
          ) : (
            <View
              key={index}
              style={{
                ...style,
                marginBottom: axis === 'y' && !isLast ? margin : 0,
                marginRight: axis === 'x' && !isLast ? margin : 0,
              }}
            >
              {React.cloneElement(child)}
            </View>
          )
        ) : null;
      })}
    </StackWrapper>
  );
}

const StackWrapper = styled('View', {
  variants: {
    axis: {
      x: { flexDirection: 'row' },
      y: { flexDirection: 'column' },
    },
    align: {
      center: { alignItems: 'center' },
      start: { alignItems: 'flex-start' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      center: { justifyContent: 'center' },
      start: { justifyContent: 'flex-start' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
    },
  },
});
