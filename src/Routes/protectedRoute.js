import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UnAuthorized from '../pages/Dashboard/pages/unAuthorized';

function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;
  return (
    isAdmin ? <Outlet /> : <UnAuthorized />
  );
}

export default ProtectedRoute;
