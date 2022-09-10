import currentWorkspaceState from '@/atoms/currentWorkspaceState';
import isLoadingState from '@/atoms/isLoadingState';
import statsState from '@/atoms/statsState';
import { useRecoilState } from 'recoil';
import Spinner from './Spinner';
import { join } from '@tauri-apps/api/path';
import LaunchCodeButton from './WorkspaceList/LaunchCodeButton';
import launchCodeCmd from '@/cmds/launchCodeCmd';
import ClipboardCopyButton from './WorkspaceList/ClipboardCopyButton';
import { writeText } from '@tauri-apps/api/clipboard';
import LanguagePercentageBar from './WorkspaceList/LanguagePercentageBar';
import LanguagePercentageList from './WorkspaceList/LanguagePercentageList';

const WorkspaceList = () => {
  const [currentWorkspace] = useRecoilState(currentWorkspaceState);
  const [stats] = useRecoilState(statsState);
  console.log(stats);
  const [isLoading] = useRecoilState(isLoadingState);
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }
  return (
    <div className="m-4">
      <table className="table-zebra table-normal table w-full border border-base-300">
        <thead>
          <tr>
            <th className="normal-case ">Project Name</th>
            <th className="w-28 normal-case">Total Size</th>
            <th className="w-96 normal-case">Percentage</th>
            <th className="w-16 normal-case"></th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat[0]}>
              <td>
                <pre>{stat[0]}</pre>
              </td>
              <td className="w-28">
                {Math.floor(
                  stat[1].map((v) => v.size).reduce((a, b) => a + b, 0) / 1024,
                )}{' '}
                KB
              </td>
              <td className="w-96">
                <div>
                  <LanguagePercentageBar stats={stat}></LanguagePercentageBar>
                </div>
                <div className="mt-1">
                  <LanguagePercentageList stats={stat}></LanguagePercentageList>
                </div>
              </td>
              <td>
                <div className="flex">
                  <div>
                    <LaunchCodeButton
                      onClick={() => {
                        if (currentWorkspace) {
                          join(currentWorkspace, stat[0]).then(launchCodeCmd);
                        }
                      }}
                    ></LaunchCodeButton>
                  </div>
                  <div className="ml-2 w-16">
                    <ClipboardCopyButton
                      onClick={() => {
                        if (currentWorkspace) {
                          join(currentWorkspace, stat[0]).then(writeText);
                        }
                      }}
                    ></ClipboardCopyButton>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkspaceList;
