import React from 'react';
import AuthForm from '../AuthForm';
import { sendAdminAuthRequest } from '../../../api-helpers/api-helpers';
import { adminActions } from '../../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login({
      id: data.id,
      token: data.token,
    }));
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  }
  
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch(err => console.log(err));
  }
  
  return (
    <div><AuthForm onSubmit={getData} isAdmin={true} /></div>
  );
}

export default Admin;
