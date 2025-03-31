import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Auth() {
  const [formAction, setFormAction] = useState('/api/v1/users/login');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {formAction === '/api/v1/users/login' ? (
        <Login
          setFormAction={setFormAction}
          setShowAdditionalFields={setShowAdditionalFields}
          setIsLoading={setIsLoading}
          navigate={navigate}
        />
      ) : (
        <Register
          setFormAction={setFormAction}
          setShowAdditionalFields={setShowAdditionalFields}
          setIsLoading={setIsLoading}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default Auth;
