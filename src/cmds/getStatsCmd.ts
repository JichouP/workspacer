import { tauri } from '@tauri-apps/api';

type Stats = [string, { lang: string; percentage: number; size: number }[]][];

const getStatsCmd = async (path: string): Promise<Stats> => {
  return tauri.invoke<Stats>('get_stats', { path });
};

export default getStatsCmd;
