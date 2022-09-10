import { FC } from 'react';

type Props = {
  path: string;
  onClick: () => void;
};

const WorkspaceButton: FC<Props> = ({ path, onClick }) => {
  return (
    <pre className="tooltip w-full" data-tip={path}>
      <button
        className="btn btn-ghost w-full p-4 normal-case"
        onClick={onClick}
      >
        <span className="w-full overflow-hidden overflow-ellipsis ">
          <pre>{path}</pre>
        </span>
      </button>
    </pre>
  );
};

export default WorkspaceButton;
