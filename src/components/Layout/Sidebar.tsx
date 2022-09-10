import currentWorkspaceState from '@/atoms/currentWorkspaceState';
import isLoadingState from '@/atoms/isLoadingState';
import statsState from '@/atoms/statsState';
import workspacesState from '@/atoms/workspacesState';
import getStatsCmd from '@/cmds/getStatsCmd';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import Logo from './Logo';
import AddWorkspaceButton from './Sidebar/AddWorkspaceButton';
import AddWorkspaceModal from './Sidebar/AddWorkspaceModal';
import Footer from './Sidebar/Footer';
import WorkspaceButton from './Sidebar/WorkspaceButton';

const Sidebar: FC = () => {
  const [workspaces] = useRecoilState(workspacesState);
  const [, setCurrentWorkspace] = useRecoilState(currentWorkspaceState);
  const [, setStats] = useRecoilState(statsState);
  const [, setIsLoading] = useRecoilState(isLoadingState);

  return (
    <div className="flex w-96 flex-col items-center justify-between bg-base-200">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="h-16 text-gray-200">
          <Logo></Logo>
        </div>
        <div className="divider m-0 h-0 w-full"></div>
      </div>
      <div className="w-full flex-1">
        {workspaces.map((v) => (
          <WorkspaceButton
            key={v}
            path={v}
            onClick={() => {
              setCurrentWorkspace(v);
              setStats([]);
              setIsLoading(true);
              getStatsCmd(v)
                .then(setStats)
                .then(() => setIsLoading(false))
                .catch(console.error);
            }}
          ></WorkspaceButton>
        ))}
        <AddWorkspaceButton onClick={() => null}></AddWorkspaceButton>
        <AddWorkspaceModal></AddWorkspaceModal>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Sidebar;
