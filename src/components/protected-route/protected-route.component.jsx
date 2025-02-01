import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/user/user.selectors';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
