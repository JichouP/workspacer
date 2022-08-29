import './bounce.css';

const MadeWithLove = () => {
  return (
    <span>
      Made with{' '}
      <span className="hover:animate-bounce-reverse inline-block text-pink-600">
        ❤
      </span>{' '}
      by JichouP
    </span>
  );
};

export default MadeWithLove;
