import create from 'zustand';
import { Anchor } from '../../../types';

type ARState = {
  anchor: Anchor | null;
  setAnchor: (anchor: Anchor) => void;
};

export const useARStore = create<ARState>((set) => ({
  anchor: null,
  setAnchor: (anchor: Anchor) => set({ anchor }),
}));
