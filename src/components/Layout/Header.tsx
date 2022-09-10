import currentWorkspaceState from '@/atoms/currentWorkspaceState';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import RemoveWorkspaceButton from './Header/RemoveWorkspaceButton';
import RemoveWorkspaceModal from './Header/RemoveWorkspaceModal';

const Header: FC = () => {
  const [currentWorkspace] = useRecoilState(currentWorkspaceState);
  return (
    <div className="flex h-16 flex-row items-center bg-base-300 p-4">
      <span className="flex-1">
        <pre>{currentWorkspace}</pre>
      </span>
      {currentWorkspace && <RemoveWorkspaceButton></RemoveWorkspaceButton>}
      <RemoveWorkspaceModal></RemoveWorkspaceModal>
    </div>
  );
};

export default Header;
