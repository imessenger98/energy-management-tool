import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../pages/sign-in';
import DashBoard from '../pages/Dashboard';
import { reAuthenticate } from '../features/auth/action';
import PrivateRoutes from './privateRoute';
import ProtectedRoute from './protectedRoute';
// common pages
import Home from '../pages/Dashboard/pages/home';
import Settings from '../pages/Dashboard/pages/settings';
import PageNotFound from '../pages/Dashboard/pages/404/404';
// admin pages
import Statistics from '../pages/Dashboard/pages/statistics';
import EVCCode from '../pages/Dashboard/pages/billing-admin/evcCode.js/evcCode';
import AccessControl from '../pages/Dashboard/pages/billing-admin/accessControl/accessControl';
import UserManagement from '../pages/Dashboard/pages/user-management-admin';
import ListBill from '../pages/Dashboard/pages/billing-admin/viewBIlls/listBill';
// user pages
import Recharge from '../pages/Dashboard/pages/Payment-user/recharge';
import AddBill from '../pages/Dashboard/pages/Payment-user/add-bill';
import Profile from '../pages/Dashboard/pages/profile';

function Routings() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isLoggedIn } = auth;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && !isLoggedIn) {
      dispatch(reAuthenticate());
    }
  }, []);

  useEffect(() => {
    if (user && !isLoggedIn) {
      dispatch(reAuthenticate());
    }
  }, [user, isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignIn />} />
      {/* private routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/payment/recharge" element={<Recharge />} />
          <Route path="/dashboard/payment/add-bill" element={<AddBill />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/statistics" element={<Statistics />} />
            <Route path="/dashboard/billing/evc-code" element={<EVCCode />} />
            <Route path="/dashboard/billing/access-control" element={<AccessControl />} />
            <Route path="/dashboard/billing/list-bill" element={<ListBill />} />
            <Route path="/dashboard/user-management" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default Routings;
