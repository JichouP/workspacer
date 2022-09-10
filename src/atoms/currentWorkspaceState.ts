import { atom } from 'recoil';

const currentWorkspaceState = atom<string | null>({
  key: 'currentWorkspaceState',
  default: null,
});

export default currentWorkspaceState;
