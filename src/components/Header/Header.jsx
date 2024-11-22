import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__email">{user?.email}</div>
      <button className="header__logout" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
