import { FC } from 'react';
import ClipboardCopyIcon from '../icons/ClipboardCopyIcon';

type Props = {
  onClick: () => void;
};

const ClipboardCopyButton: FC<Props> = ({ onClick }) => {
  return (
    <button className="btn btn-circle" onClick={onClick}>
      <div className="h-6 w-6">
        <ClipboardCopyIcon></ClipboardCopyIcon>
      </div>
    </button>
  );
};

export default ClipboardCopyButton;
