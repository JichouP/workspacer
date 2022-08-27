import { FC } from 'react';
import logo from '@/assets/Logo.svg';

const Logo: FC = () => {
  return (
    <div className="h-16">
      <img src={logo}></img>
    </div>
  );
};

export default Logo;
