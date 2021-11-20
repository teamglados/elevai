import React from 'react';
import { addDays } from 'date-fns';
import { range } from 'lodash';
import { useWindowDimensions } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { useTheme } from '../../styles/styled';

type Props = {};

const MAX_Y = 300;

export default function Chart({}: Props) {
  const theme = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - 16;
  const height = 200;

  const line = React.useMemo(() => {
    const data = range(20).map((i) => [
      addDays(new Date(), i),
      MAX_Y * Math.random(),
    ]);

    const scaleX = d3Scale
      .scaleTime()
      .domain([data[0][0], data[data.length - 1][0]])
      .range([0, width]);

    const scaleY = d3Scale
      .scaleLinear()
      .domain([0, MAX_Y])
      .range([height - 10, 10]);

    return d3Shape
      .line()
      .x((d) => scaleX(d[0]))
      .y((d) => scaleY(d[1]))
      .curve(d3Shape.curveBasis)(data as any);
  }, []);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
          <Stop stopColor={theme.colors.primary.value} offset="0%" />
          <Stop stopColor="#222" offset="100%" />
        </LinearGradient>
      </Defs>

      {!!line && (
        <>
          <Path
            d={`${line} L ${width} ${height} L 0 ${height}`}
            fill="url(#gradient)"
          />

          <Path
            d={line}
            fill="transparent"
            stroke={theme.colors.primaryLight.value}
            strokeWidth={2}
          />
        </>
      )}
    </Svg>
  );
}
