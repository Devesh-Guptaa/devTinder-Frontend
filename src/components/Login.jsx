import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('Devesh@gmail.com');
  const [password, setPassword] = useState('Temp@1234');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');
    try {
      const user = await axios.post(
        BASE_URL + '/login',
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(user.data));
      return navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  }

  return (
    <div>
      <div className='flex justify-center my-10'>
        <div className='card bg-base-300 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Login</h2>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Email Id</legend>
              <input
                type='text'
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='id@email.com'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Password</legend>
              <input
                type='text'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
            </fieldset>
            {error && <p className='text-red-300'>{error}</p>}
            <div className='card-actions justify-center mt-4'>
              <button className='btn btn-primary' onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
