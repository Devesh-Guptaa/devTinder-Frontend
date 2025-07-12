import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  useEffect(() => getRequests, []);

  async function getRequests() {
    try {
      const requests = await axios.get(BASE_URL + '/user/request/received', {
        withCredentials: true,
      });
      dispatch(addRequests(requests.data.data));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleAccept(action, reqId) {
    try {
        const response = await axios.post(
          BASE_URL + '/request/review/' + action + '/' + reqId,
          {},
          { withCredentials: true }
        );
      dispatch(removeRequest(reqId));
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!requests) return <>null</>;
  if (requests.length === 0)
    return (
      <div className='flex justify-center text-3xl mt-15'>
        No pending requests
      </div>
    );

  return (
    <div>
      <h1 className='flex justify-center mt-10 text-4xl'>Requests</h1>
      <div className='space-y-8 mt-10 w-5/9 mx-auto'>
        {requests.map((req) => {
          const { firstName, lastName, about, age, gender, photoUrl } =
            req.fromUserId;
          return (
            <div
              key={req._id}
              className='card card-side bg-base-300 shadow-sm rounded-l-full rounded-r-full'
            >
              <figure>
                <img
                  src={photoUrl}
                  alt='Photo'
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </figure>

              <div className='card-body'>
                <h2 className='card-title'>
                  {firstName} {lastName}
                </h2>
                <p>
                  {age},{gender}
                </p>
                <p>{about}</p>
                <div className='card-actions justify-end mx-10'>
                  <button className='btn btn-primary'>Reject</button>
                  <button
                    className='btn btn-secondary'
                    onClick={() => handleAccept('accepted', req._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
