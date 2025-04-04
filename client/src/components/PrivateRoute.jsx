import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  return userInfo ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;