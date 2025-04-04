import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 100, color = 'primary', message, animation = 'border' }) => {
  return (
    <div className="text-center">
      <Spinner
        animation={animation}
        role="status"
        variant={color}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Loader;