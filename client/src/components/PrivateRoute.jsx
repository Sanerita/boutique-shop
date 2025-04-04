import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ admin = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) return <Navigate to="/login" replace />;
  if (admin && !userInfo.isAdmin) return <Navigate to="/" replace />;
  
  return <Outlet />;
};

export default PrivateRoute;