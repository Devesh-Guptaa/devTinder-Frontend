import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const feed = () => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  async function getFeed() {
    try {
      const data = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });

      console.log(data.data.data[0]);
      dispatch(addFeed(data.data.data));
      setUser(data.data.data[0]);
    } catch (err) {}
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className='flex justify-center my-10'>
      <div className='card bg-base-300 w-96 shadow-sm '>
        <figure>
          <img src={user.photoUrl} alt='Profile' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            {user.firstName} {user.lastName}
          </h2>
          <p>
            {user.age}, {user.gender}
          </p>
          <p>{user.about}</p>
          <div className='card-actions justify-center space-x-6'>
            <button className='btn btn-primary'>Ignore</button>
            <button className='btn btn-secondary'>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feed;
