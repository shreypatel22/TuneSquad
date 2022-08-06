import React from 'react';
import useAuth from './useAuth';

export default function UserProfile({code}) {
  const accessToken = useAuth(code)
  return (
      <button className="login-button">
        Username
      </button>
  )
}
