import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__email">{userEmail}</div>
      <button className="header__logout" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
