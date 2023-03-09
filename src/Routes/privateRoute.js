import React, { useEffect } from 'react';
import {
  Outlet, Navigate, useLocation, useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {
  message,
} from 'antd';
import { logOutUser } from '../features/auth/action';

const parseJwt = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
};
function PrivateRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let decodedJwt;
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user) {
      decodedJwt = parseJwt(user?.refreshToken);
      if (decodedJwt.exp * 1000 <= Date.now()) {
        message.error('login Expired');
        dispatch(logOutUser());
        navigate('/');
      }
    }
  }, [location]);

  const condition = user && isLoggedIn;
  return (
    condition ? <Outlet /> : <Navigate to="/" />
  );
}

export default PrivateRoutes;
