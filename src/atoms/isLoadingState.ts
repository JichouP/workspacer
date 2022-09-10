import { atom } from 'recoil';

const isLoadingState = atom<boolean>({
  key: 'isLoadingState',
  default: false,
});

export default isLoadingState;
