import React from 'react';
import { isNumber, isString } from 'lodash';
import { useWindowDimensions } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

import { styled, useTheme } from '../../styles/styled';
import { Stack, Text } from '../../components';
import { features } from '../data';

function IncidentFeatures() {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth / 2;

  const data = features.map((feature) => ({
    ...feature,
    value: feature.value(),
  }));

  const bars = data.filter((d) => isNumber(d.value));
  const categories = data.filter((d) => isString(d.value));
  const height = Math.max(...bars.map((b) => b.value as number));

  return (
    <Wrapper>
      <NumericFeatures>
        <Stack axis="y" space="2">
          <Svg
            width={width}
            height={height}
            style={{ transform: [{ scaleY: -1 }] }}
          >
            <Defs>
              <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradient">
                <Stop stopColor={theme.colors.primary.value} offset="0%" />
                <Stop
                  stopColor={theme.colors.primaryLight.value}
                  offset="100%"
                />
              </LinearGradient>
            </Defs>

            {bars.map((bar, index) => {
              const value = bar.value as number;

              return (
                <Rect
                  key={index}
                  x={index * (width / bars.length) + 12}
                  y={0}
                  width={width / bars.length - 24}
                  height={value}
                  fill="url(#gradient)"
                  rx={6}
                />
              );
            })}
          </Svg>

          <Stack axis="x" space="none" justify="between" align="center">
            {bars.map((feature) => (
              <FeatureIconWrapper
                key={feature.id}
                style={{ width: width / bars.length }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
              </FeatureIconWrapper>
            ))}
          </Stack>

          <FeatureLabels axis="x" space="none" justify="between" align="center">
            {bars.map((feature) => (
              <Text key={feature.id} variant="bodyExtraSmall" color="textMuted">
                {feature.label}
              </Text>
            ))}
          </FeatureLabels>
        </Stack>
      </NumericFeatures>

      <CategoryFeatures>
        <Stack axis="y" space="3" align="end">
          {categories.map((feature) => (
            <Stack key={feature.id} axis="x" space="2" justify="between">
              <Stack axis="y" space="2" align="end">
                <Text variant="bodySmall" color="textMuted">
                  {feature.label}
                </Text>
                <Text variant="body">{feature.value}</Text>
              </Stack>
              <FeatureIcon>{feature.icon}</FeatureIcon>
            </Stack>
          ))}
        </Stack>
      </CategoryFeatures>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flexDirection: 'row',
});

const NumericFeatures = styled('View', {
  flex: 1,
  justifyContent: 'flex-end',
});

const CategoryFeatures = styled('View', {
  flex: 1,
  paddingHorizontal: '$3',
});

const FeatureIconWrapper = styled('View', {
  flexCenter: 'row',
});

const FeatureIcon = styled('View', {
  width: 30,
  height: 30,
  flexCenter: 'row',
  borderRadius: '$full',
  backgroundColor: '$surfaceDistinct',
});

const FeatureLabels = styled(Stack, {
  paddingLeft: 16,
});

export default React.memo(IncidentFeatures);
