import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthResponse }from '../models/TokenModel'
import { gql, useMutation } from '@apollo/client';


const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      authToken {
        accessToken
      }
    }
  }
`;

interface LoginModel {
    login: AuthResponse
  }

const LoginPage: React.FC = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
  
    const navigate = useNavigate();

    const [login, { loading }] = useMutation<LoginModel>(
        LOGIN_USER,
        {
          onError: (error) => {
            setMessage(error.message);
          },
          onCompleted: (data) => {
            const token = data?.login?.authToken?.accessToken;
            console.log(data)
            console.log(token)
          localStorage.setItem("token", token);
          setLoginSuccess(true)
            setMessage("login successfully.. redirect to homepage..")
            setTimeout(() => {
              navigate('/home');
            window.location.reload();

            }, 3000);
          },
        }
      );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        login({
          variables: {
            input: {
              username,
              password,
            },
          },
        });
      };


    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>username:</label><input type="text" value={username} onChange={e => setUserName(e.target.value)}/><br/>
            <label>password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <input type="submit" value="Submit" disabled={loading || loginSuccess}></input>
        </form>
        <p>{message}</p>
      </div>
    );
  };

export default LoginPage