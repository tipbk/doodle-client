import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthResponse }from '../models/TokenModel'

interface RegisterModel {
  register: AuthResponse
}

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      authToken {
        accessToken
      }
    }
  }
`;

const RegisterPage: React.FC = () => {
    

    const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const navigate = useNavigate();
  

  const [registerUser, { data, loading }] = useMutation<RegisterModel>(
    REGISTER_USER,
    {
      onError: (error) => {
        setMessage(error.message);
      },
      onCompleted: (data) => {
        const token = data?.register?.authToken?.accessToken;
        console.log(data)
        console.log(token)
      localStorage.setItem("token", token);
      setRegisterSuccess(true)
        setMessage("register successfully.. redirect to login page..")
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser({
      variables: {
        input: {
          username,
          password,
          confirmPassword: password,
        },
      },
    });
  };

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label>username:</label><input type="text" value={username} onChange={e => setUserName(e.target.value)}/><br/>
            <label>password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <input type="submit" value="Submit" disabled={loading || registerSuccess}></input>
        </form>
        <p>{message}</p>
      </div>
    );
  };

export default RegisterPage