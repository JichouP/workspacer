import { tauri } from '@tauri-apps/api';

type Path = string;
const removeWorkspaceCmd = async (path: Path): Promise<Path> => {
  return tauri.invoke<Path>('remove_workspace', { path });
};

export default removeWorkspaceCmd;
