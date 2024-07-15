import React from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onResReceived = (data) => {
    console.log("Response data:", data);

    if (data && data.id) {
      // For signup response
      dispatch(userActions.login());
      localStorage.setItem("userId", data.id);
      console.log("Signup successful. Navigating to home...");
      navigate("/");
    } else if (data && data.user && data.user._id) {
      // For login response
      dispatch(userActions.login());
      localStorage.setItem("userId", data.user._id);
      console.log("Login successful. Navigating to home...");
      navigate("/");
    } else {
      console.log("Failed to receive valid user data.");
    }
  }

  const getData = (data) => {
    console.log("Form data:", data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => {
        console.error("Error in sending user authentication request:", err);
        // Handle error if necessary
      });
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
