import currentWorkspaceState from '@/atoms/currentWorkspaceState';
import workspacesState from '@/atoms/workspacesState';
import getWorkspaceCmd from '@/cmds/getWorkspaceCmd';
import removeWorkspaceCmd from '@/cmds/removeWorkspaceCmd';
import { useRecoilState } from 'recoil';

const RemoveWorkspaceModal = () => {
  const [currentWorkspace, setCurrentWorkspace] = useRecoilState(
    currentWorkspaceState,
  );
  const [, setWorkspaces] = useRecoilState(workspacesState);
  return (
    <>
      <input
        type="checkbox"
        id="remove-workspace-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Remove Workspace</h3>
          <div className="ml-4 mt-2">
            <p>
              Do you really want to remove the following workspace from the
              list?
            </p>
            <pre className="mx-2 overflow-hidden">{currentWorkspace}</pre>
          </div>
          <div className="modal-action">
            <label htmlFor="remove-workspace-modal" className="btn">
              Cancel
            </label>
            <label
              htmlFor="remove-workspace-modal"
              className="btn btn-error"
              onClick={async () => {
                if (currentWorkspace) {
                  try {
                    await removeWorkspaceCmd(currentWorkspace);
                    const workspaces = await getWorkspaceCmd();
                    setWorkspaces(workspaces);
                    setCurrentWorkspace(null);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }}
            >
              Remove
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveWorkspaceModal;
