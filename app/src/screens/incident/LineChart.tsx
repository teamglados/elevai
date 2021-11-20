import React from 'react';
import { addDays } from 'date-fns';
import { range, clamp } from 'lodash';
import { useWindowDimensions } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Path, Line } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { useTheme } from '../../styles/styled';

const MAX_Y = 240;

function LineChart() {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - 16;
  const height = MAX_Y;

  const { line, threshold } = React.useMemo(() => {
    const yStep = MAX_Y / 20;
    const data = range(20).map(
      (i) =>
        [
          addDays(new Date(), i + 1),
          clamp(
            yStep * i + 40 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
            MAX_Y * 0.2,
            MAX_Y * 0.8,
          ),
        ] as const,
    );

    const scaleX = d3Scale
      .scaleTime()
      .domain([data[0][0], data[data.length - 1][0]])
      .range([0, width]);

    const scaleY = d3Scale.scaleLinear().domain([0, MAX_Y]).range([height, 0]);

    const line = d3Shape
      .line()
      .x((d) => scaleX(d[0]))
      .y((d) => scaleY(d[1]))
      .curve(d3Shape.curveBasis)(data as any) as string;

    const threshold = randomBetwen(30, 50);

    return { line, threshold };
  }, []);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient
          id="gradient"
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={theme.colors.chartNegative.value} offset="0%" />
          <Stop stopColor="#222" offset={`${threshold}%`} />
          <Stop
            stopColor={theme.colors.chartPositive.value}
            offset={`${threshold}%`}
          />
          <Stop stopColor={theme.colors.background.value} offset="100%" />
        </LinearGradient>

        <LinearGradient
          id="line-gradient"
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={theme.colors.chartNegativeLight.value} offset="0%" />
          <Stop
            stopColor={theme.colors.chartNegativeLight.value}
            offset={`${threshold}%`}
          />
          <Stop
            stopColor={theme.colors.chartPositiveLight.value}
            offset={`${threshold}%`}
          />
          <Stop
            stopColor={theme.colors.chartPositiveLight.value}
            offset="100%"
          />
        </LinearGradient>
      </Defs>

      <Path
        d={`${line} L ${width} ${height} L 0 ${height}`}
        fill="url(#gradient)"
      />

      <Path
        d={line}
        fill="transparent"
        stroke="url(#line-gradient)"
        strokeWidth={2}
      />

      <Line
        x1="0"
        y1={`${threshold}%`}
        x2="100%"
        y2={`${threshold}%`}
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
    </Svg>
  );
}

function randomBetwen(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default React.memo(LineChart);
