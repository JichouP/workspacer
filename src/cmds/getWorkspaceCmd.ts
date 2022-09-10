import { tauri } from '@tauri-apps/api';

type Path = string;
const getWorkspaceCmd = async (): Promise<Path[]> => {
  const result = await tauri.invoke<Path[]>('get_workspace');

  return result;
};

export default getWorkspaceCmd;
