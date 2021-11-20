import { ViroARTrackingTargets } from '@viro-community/react-viro';

export function setupImageTargets() {
  ViroARTrackingTargets.createTargets({
    logo: {
      source: require('../../assets/logo_target.jpg'),
      orientation: 'Up',
      physicalWidth: 0.06,
    },
  });
}
