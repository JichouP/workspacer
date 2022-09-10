import { atom } from 'recoil';

const isLoadingState = atom<boolean>({
  key: 'currentWorkspaceState',
  default: false,
});

export default isLoadingState;
