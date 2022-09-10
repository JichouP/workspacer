import { tauri } from '@tauri-apps/api';

type Path = string;
const getWorkspace = async (): Promise<Path[]> => {
  const result = await tauri.invoke<Path[]>('get_workspace');

  return result;
};

export default getWorkspace;
