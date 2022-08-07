import React from 'react';
import useAuth from './useAuth';
import './Login.scss';

export default function Dashboard({code}) {
  const accessToken = useAuth(code)
  return (
      <button className="login-button">
        username  
      </button>
  )
}
