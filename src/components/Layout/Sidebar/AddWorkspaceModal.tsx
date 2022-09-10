import workspacesState from '@/atoms/workspacesState';
import addWorkspaceCmd from '@/cmds/addWorkspaceCmd';
import getWorkspaceCmd from '@/cmds/getWorkspaceCmd';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';

const AddWorkspaceModal = () => {
  const [, setWorkspaces] = useRecoilState(workspacesState);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        type="checkbox"
        id="add-workspace-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-workspace-modal"
            className="btn btn-circle btn-sm absolute right-4 top-4"
          >
            ✕
          </label>
          <h3 className="text-xl font-bold">Add Workspace</h3>
          <input
            type="text"
            placeholder="C:\workspace"
            className="input input-bordered mt-4 w-full"
            ref={inputRef}
          />
          <div className="modal-action">
            <label
              htmlFor="add-workspace-modal"
              className="btn btn-success"
              onClick={async () => {
                const path = inputRef.current?.value;
                if (!path) return;
                try {
                  await addWorkspaceCmd(path);
                  const workspaces = await getWorkspaceCmd();
                  setWorkspaces(workspaces);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkspaceModal;
