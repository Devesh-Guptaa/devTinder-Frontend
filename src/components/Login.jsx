import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');
    try {
      const user = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
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

  async function handleSignup() {
    try {
      const user = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(user.data));
      navigate('/profile');
    } catch (err) {}
  }

  return (
    <div>
      <div className='flex justify-center my-10'>
        <div className='card bg-base-300 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title mb-4'>
              {' '}
              {isSignUp ? 'Sign Up' : 'Login'}
            </h2>
            {isSignUp && (
              <>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>First Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='Sunny'
                  />
                </fieldset>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Last Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Gavaskar'
                  />
                </fieldset>
              </>
            )}
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Email Id</legend>
              <input
                type='text'
                className='input'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
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
              <button
                className='btn btn-primary'
                onClick={isSignUp ? handleSignup : handleLogin}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </div>
            <p
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
              className='mx-auto mt-4 text-1xl cursor-pointer hover:underline'
            >
              {isSignUp ? 'Existing user? Login' : 'New User? Sign Up'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
