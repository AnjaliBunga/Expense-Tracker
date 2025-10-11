import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Authentication = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (user) => {
    onAuthSuccess(user);
  };

  const handleSignup = (user) => {
    onAuthSuccess(user);
  };

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={switchToSignup} 
        />
      ) : (
        <Signup 
          onSignup={handleSignup} 
          onSwitchToLogin={switchToLogin} 
        />
      )}
    </div>
  );
};

export default Authentication;
