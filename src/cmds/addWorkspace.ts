import { tauri } from '@tauri-apps/api';

type Path = string;
const addWorkspace = async (path: Path): Promise<Path> => {
  const result = await tauri.invoke<Path>('add_workspace', { path });

  return result;
};

export default addWorkspace;
