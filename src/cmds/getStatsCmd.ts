import { tauri } from '@tauri-apps/api';

export type Stats = [
  string,
  { lang: string; percentage: number; size: number }[],
];

const getStatsCmd = async (path: string): Promise<Stats[]> => {
  return tauri.invoke<Stats[]>('get_stats', { path });
};

export default getStatsCmd;
