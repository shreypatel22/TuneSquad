import React from 'react';
import useAuth from './useAuth';

export default function UserProfile({code}) {
  const accessToken = useAuth(code)
  return (
    <div>
        <a>
      <button className="login-button">
        UserName      
      </button>
      </a>
    </div>
  )
}
