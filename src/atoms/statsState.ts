import { Stats } from '@/cmds/getStatsCmd';
import { atom } from 'recoil';

const statsState = atom<Stats[]>({
  key: 'statsState',
  default: [],
});

export default statsState;
