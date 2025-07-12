import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  useEffect(() => {
    if (!userData) fetchUser();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  async function fetchUser() {
    try {
      const user = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });

      dispatch(addUser(user.data.data));
    } catch (err) {
      if (err.status == 401) {
        navigate('/login');
      }
    }
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
