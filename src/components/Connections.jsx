import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  useEffect(() => {
    getConnections();
  }, []);

  async function getConnections() {
    try {
      const connections = await axios.get(
        BASE_URL + '/user/request/connections',
        { withCredentials: true }
      );
      dispatch(addConnections(connections.data.data));
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className='flex justify-center text-3xl mt-15'>No Connections</div>
    );

  return (
    <div>
      <h1 className='flex justify-center mt-10 text-4xl'>Connections</h1>
      <div className='space-y-6 mt-10 w-4/9 mx-auto'>
        {connections.map((connection) => {
          const { firstName, lastName, about, age, gender, photoUrl } =
            connection;
          return (
            <div className='card card-side bg-base-300 shadow-sm rounded-l-full rounded-r-full'>
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
                <h2 className='card-title'>{firstName}</h2>
                <p>
                  {age},{gender}
                </p>
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
