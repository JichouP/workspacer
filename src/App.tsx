import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import workspacesState from './atoms/workspacesState';
import getWorkspaceCmd from './cmds/getWorkspaceCmd';
import WorkspaceList from './components/WorkspaceList';
import Layout from './components/Layout';
import currentWorkspaceState from './atoms/currentWorkspaceState';
import getStatsCmd from './cmds/getStatsCmd';
import statsState from './atoms/statsState';
import isLoadingState from './atoms/isLoadingState';

const App: FC = () => {
  const [, setWorkspaces] = useRecoilState(workspacesState);
  const [, setCurrentWorkspaces] = useRecoilState(currentWorkspaceState);
  const [, setStats] = useRecoilState(statsState);
  const [, setIsLoading] = useRecoilState(isLoadingState);

  useEffect(() => {
    // disable context menu
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    setIsLoading(true);
    getWorkspaceCmd()
      .then((workspaces) => {
        setWorkspaces(workspaces);
        if (workspaces.length) {
          const [workspace] = workspaces;
          setCurrentWorkspaces(workspace);
          getStatsCmd(workspace)
            .then((stats) => {
              setStats(stats);
              setIsLoading(false);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, [setWorkspaces, setCurrentWorkspaces, setStats, setIsLoading]);

  return (
    <div className="select-none">
      <Layout>
        <WorkspaceList></WorkspaceList>
      </Layout>
    </div>
  );
};

export default App;
