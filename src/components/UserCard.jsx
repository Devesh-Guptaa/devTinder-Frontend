import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = (data) => {
  const user = data.user;
  const dispatch = useDispatch();

  async function handleAction(status, userId) {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!user) return <h1>NO USERS LEFT</h1>;

  return (
    user && (
      <div className='card bg-base-300 w-96 shadow-sm p-5'>
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
            <button
              className='btn btn-primary'
              onClick={() => handleAction('ignored', user._id)}
            >
              Ignore
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => handleAction('interested', user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
