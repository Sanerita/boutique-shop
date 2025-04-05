import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 100, color = 'maroon', message, animation = 'grow' }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <Spinner
          animation={animation}
          role="status"
          variant={color}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
        {message && <p className="mt-3 text-maroon">{message}</p>}
      </div>
    </div>
  );
};

export default Loader;

