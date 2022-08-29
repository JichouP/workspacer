import { FC } from 'react';
import AddIcon from './AddIcon';

const AddWorkspaceButton: FC = () => {
  return (
    <button className="flex w-full flex-row items-center justify-center text-center">
      <AddIcon></AddIcon>
      <span className="m-2 text-lg">Add Workspace</span>
    </button>
  );
};

export default AddWorkspaceButton;
