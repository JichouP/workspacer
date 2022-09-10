import { tauri } from '@tauri-apps/api';

type Path = string;
const addWorkspaceCmd = async (path: Path): Promise<Path> => {
  return tauri.invoke<Path>('add_workspace', { path });
};

export default addWorkspaceCmd;
