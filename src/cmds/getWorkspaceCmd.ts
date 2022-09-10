import { tauri } from '@tauri-apps/api';

type Path = string;
const getWorkspaceCmd = async (): Promise<Path[]> => {
  return tauri.invoke<Path[]>('get_workspace');
};

export default getWorkspaceCmd;
