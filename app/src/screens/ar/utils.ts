import {
  ViroARTrackingTargets,
  ViroMaterials,
} from '@viro-community/react-viro';

export function setupAR() {
  ViroARTrackingTargets.createTargets({
    logo: {
      source: require('../../assets/target.jpg'),
      orientation: 'Up',
      physicalWidth: 0.06,
    },
  });

  ViroMaterials.createMaterials({
    box: {
      cullMode: 'None',
      shininess: 2.0,
      diffuseColor: '#444444',
    },
  });
}
