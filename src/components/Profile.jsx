import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.age);
  const [about, setAbout] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.age);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setAbout(user.about || '');
      setPhotoUrl(user.photoUrl || '');
    }
  }, [user]);

  async function updateProfile() {
    try {
      const data = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(data.data.data));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <div className='flex justify-center my-10 space-x-4'>
        <div className='card bg-base-300 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title flex justify-center'>Profile</h2>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>First Name</legend>
              <input
                type='text'
                className='input'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='id@email.com'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Last Name</legend>
              <input
                type='text'
                className='input'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='lastName'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Age</legend>
              <input
                type='text'
                className='input'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='28'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Gender</legend>
              <input
                type='text'
                className='input'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder='male'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Photo URL</legend>
              <input
                type='text'
                className='input'
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder='https://photo'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>About</legend>
              <input
                type='text'
                className='input'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder='about'
              />
            </fieldset>
            {/* {error && <p className='text-red-300'>{error}</p>} */}
            <div className='card-actions justify-center mt-4'>
              <button className='btn btn-primary' onClick={updateProfile}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className='card bg-base-300 w-96 shadow-sm '>
          <figure>
            <img src={photoUrl} alt='Profile' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>
              {firstName} {lastName}
            </h2>
            <p>
              {age}, {gender}
            </p>
            <p>{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
