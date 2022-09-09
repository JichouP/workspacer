import { atom } from 'recoil';

const workspacesState = atom<string[]>({
  key: 'workspacesState',
  default: [],
});

export default workspacesState;
