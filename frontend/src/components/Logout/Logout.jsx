import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice.jsx'; 
import { useDispatch } from 'react-redux';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
  };
  return logout;
};

export default useLogout;
