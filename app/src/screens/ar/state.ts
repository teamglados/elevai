import create from 'zustand';
import { Anchor } from '../../../types';

type ARState = {
  anchor: Anchor | null;
  setAnchor: (anchor: Anchor | null) => void;
};

export const useARStore = create<ARState>((set) => ({
  anchor: null,
  setAnchor: (anchor) => set({ anchor }),
}));
