import { FC } from 'react';

type Props = {
  path: string;
  onClick: () => void;
};

const WorkspaceButton: FC<Props> = ({ path, onClick }) => {
  return (
    <button className="btn btn-ghost w-full p-4" onClick={onClick}>
      <span className="w-full overflow-hidden overflow-ellipsis normal-case">
        {path}
      </span>
    </button>
  );
};

export default WorkspaceButton;
