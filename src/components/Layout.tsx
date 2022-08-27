import { FC, PropsWithChildren } from 'react';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-screen flex-row">
      <Sidebar></Sidebar>
      <div className="flex h-screen flex-1 flex-col">
        <Header></Header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
