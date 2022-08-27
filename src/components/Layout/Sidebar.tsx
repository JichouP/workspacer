import { FC } from 'react';
import Logo from './Logo';

const Sidebar: FC = () => {
  return (
    <div className="w-60 bg-base-200">
      <Logo></Logo>
      <div className="divider m-0 h-0"></div>
    </div>
  );
};

export default Sidebar;
