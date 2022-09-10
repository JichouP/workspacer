import workspacesState from '@/atoms/workspacesState';
import addWorkspace from '@/cmds/addWorkspace';
import getWorkspace from '@/cmds/getWorkspace';
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
                addWorkspace(path)
                  .then(() => getWorkspace())
                  .then(setWorkspaces)
                  .catch(console.error);
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
