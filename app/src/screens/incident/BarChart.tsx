import React from 'react';
import { range, clamp } from 'lodash';
import { useWindowDimensions } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

import { styled, useTheme } from '../../styles/styled';
import { features } from '../data';
import { Stack, Text } from '../../components';

const MAX_Y = 200;

function BarChart() {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth;
  const height = MAX_Y;

  const bars = React.useMemo(() => {
    return range(features.length).map((i) => [
      i,
      clamp(MAX_Y * Math.random(), 10, MAX_Y - 10),
    ]);
  }, []);

  return (
    <Wrapper>
      <Stack axis="y" space="2">
        <Svg
          width={width}
          height={height}
          style={{ transform: [{ scaleY: -1 }] }}
        >
          <Defs>
            <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradient">
              <Stop stopColor={theme.colors.primary.value} offset="0%" />
              <Stop stopColor={theme.colors.primaryLight.value} offset="100%" />
            </LinearGradient>
          </Defs>

          {bars.map((bar, index) => (
            <Rect
              key={index}
              x={bar[0] * (width / bars.length) + 12}
              y={0}
              width={width / bars.length - 24}
              height={bar[1]}
              fill="url(#gradient)"
              rx={6}
            />
          ))}
        </Svg>

        <Stack axis="x" space="none" justify="between" align="center">
          {features.map((feature) => (
            <FeatureIconWrapper
              key={feature.id}
              style={{ width: width / bars.length }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
            </FeatureIconWrapper>
          ))}
        </Stack>

        <FeatureLabels axis="x" space="none" justify="between" align="center">
          {features.map((feature) => (
            <Text key={feature.id} variant="bodyExtraSmall">
              {feature.name}
            </Text>
          ))}
        </FeatureLabels>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  paddingBottom: '$3',
});

const FeatureIconWrapper = styled('View', {
  flexCenter: 'row',
});

const FeatureIcon = styled('View', {
  width: 30,
  height: 30,
  flexCenter: 'row',
  borderRadius: '$full',
  backgroundColor: '$surface',
});

const FeatureLabels = styled(Stack, {
  paddingLeft: 16,
  paddingRight: 8,
});

export default React.memo(BarChart);
