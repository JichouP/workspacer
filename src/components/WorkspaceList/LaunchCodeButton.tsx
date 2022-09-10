import { FC } from 'react';
import CodeIcon from '../icons/CodeIcon';

type Props = {
  onClick: () => void;
};

const LaunchCodeButton: FC<Props> = ({ onClick }) => {
  return (
    <button className="btn btn-circle" onClick={onClick}>
      <div className="h-6 w-6">
        <CodeIcon></CodeIcon>
      </div>
    </button>
  );
};

export default LaunchCodeButton;
