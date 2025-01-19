import { create } from 'zustand';

interface DialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface OnboardingStatusProps {
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: () => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useOnboardingStatus = create<OnboardingStatusProps>((set) => ({
  isOnboardingComplete: false,
  setIsOnboardingComplete: () => set({ isOnboardingComplete: true }),
}));
