import { tauri } from '@tauri-apps/api';

type Path = string;
const removeWorkspaceCmd = async (path: Path): Promise<Path> => {
  const result = await tauri.invoke<Path>('remove_workspace', { path });

  return result;
};

export default removeWorkspaceCmd;
