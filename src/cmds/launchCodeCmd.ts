import { tauri } from '@tauri-apps/api';

type Path = string;
const launchCodeCmd = async (path: Path): Promise<Path> => {
  return tauri.invoke<Path>('launch_code', { path });
};

export default launchCodeCmd;
