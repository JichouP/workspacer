import { tauri } from '@tauri-apps/api';

type Stats = [string, { lang: string; percentage: number; size: number }[]][];

const get_stats = async (path: string): Promise<Stats> => {
  const result = await tauri.invoke<Stats>('get_stats', { path });
  return result;
};

export default get_stats;
