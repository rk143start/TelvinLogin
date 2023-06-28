import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('https://storebh.bhaaraterp.com/api/my-profile/', {
        headers: {
          Token: '<your-access-token>'
        }
      });

      // Set the profile data in state
      setProfileData(response.data);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
      setGender(response.data.gender);
      setDateOfBirth(response.data.date_of_birth);
      setProfilePicture(response.data.profile_picture);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.post(
        'https://storebh.bhaaraterp.com/api/update-profile/',
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          date_of_birth: dateOfBirth,
          profile_picture: profilePicture
        },
        {
          headers: {
            Token: '<your-access-token>'
          }
        }
      );

      navigate('/');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen py-8">
      <h2 className="text-2xl font-bold my-4">Personal Information</h2>
      <div className="w-1/3">
        <h3 className="text-lg font-bold mb-2">Update Profile:</h3>
        <div className="my-2">
          <p className="text-sm mb-1">First Name: {profileData.first_name}</p>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="my-2">
          <p className="text-sm mb-1">Last Name: {profileData.last_name}</p>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="my-2">
          <p className="text-sm mb-1">Email: {profileData.email}</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="my-2">
          <p className="text-sm mb-1">Gender: {profileData.gender}</p>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="my-2">
          <p className="text-sm mb-1">Date of Birth: {profileData.date_of_birth}</p>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of Birth"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="my-2">
          <p className="text-sm mb-1">Profile Picture: {profileData.profile_picture}</p>
          <input
            type="file"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Profile Picture"
            className="w-full border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={updateProfile}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
