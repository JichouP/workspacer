import { FC } from 'react';
import AddIcon from './AddIcon';

type Props = {
  onClick: () => void;
};

const AddWorkspaceButton: FC<Props> = () => {
  return (
    <button className="btn btn-ghost flex w-full flex-row items-center justify-center normal-case">
      <AddIcon></AddIcon>
      <span className="m-2 text-lg">Add Workspace</span>
    </button>
  );
};

export default AddWorkspaceButton;
