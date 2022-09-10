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
            <span>Do you really want to remove it?</span>
            <br />
            <span>
              ( It will be removed from the list, but the workspace itself{' '}
              <span className="font-bold">will NOT</span> be deleted. )
            </span>
          </div>
          <pre>{currentWorkspace}</pre>
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
