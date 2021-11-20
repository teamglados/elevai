import React from 'react';
import { Animated } from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';

import { styled, useTheme } from '../styles/styled';
import { Stack } from './Stack';
import { Text } from './Text';

export function CollapseSection({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon?: string;
}) {
  const [isOpen, setOpen] = React.useState(false);
  const chevronAnimation = React.useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  React.useEffect(() => {
    Animated.timing(chevronAnimation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const chevronRotation = chevronAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <CollapseHeaderButton onPress={() => setOpen((p) => !p)}>
        <Stack axis="x" space="2" align="center" style={{ flex: 1 }}>
          {icon && (
            <McIcon name={icon} size={16} color={theme.colors.primary.value} />
          )}

          <Text variant="body" color="primary">
            {title}
          </Text>
        </Stack>

        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <FeIcon name="chevron-down" size={18} color="#444" />
        </Animated.View>
      </CollapseHeaderButton>

      <Collapsible collapsed={!isOpen}>
        <CollapseContent>{children}</CollapseContent>
      </Collapsible>
    </>
  );
}

const CollapseHeaderButton = styled('TouchableOpacity', {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderColor: '$surface',
  padding: '$3',
  marginHorizontal: '-$3',
});

const CollapseContent = styled('View', {
  paddingVertical: '$3',
});
