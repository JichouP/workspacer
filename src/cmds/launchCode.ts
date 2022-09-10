import { tauri } from '@tauri-apps/api';

type Path = string;
const launchCode = async (path: Path): Promise<Path> => {
  const result = await tauri.invoke<Path>('launch_code', { path });

  return result;
};

export default launchCode;
