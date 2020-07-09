import React, { useState, useEffect } from 'react';
import './login.css';
import logo from '../../assets/logo2.png'
import { login } from '../../providers/api';
import { setAuthToken, isAuthenticated } from '../../providers/auth';

function LoginPage(props) {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('asgdf');
      loginHandler();
    }
  });

  const usernameHandler = (event) => {
    setError(null);
    setUser(event.target.value);
  }

  const passwordHandler = (event) => {
    setError(null);
    setPassword(event.target.value);
  }


  const loginHandler = async () => {
    if (!isLoading) {
      try {
        const { data } = await login(user, password);

        setAuthToken(data.token);

        props.history.push('/map');

      } catch ({ message }) {
        setIsLoading(false);
        setError(message);
      }
    }

  }

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="login-container">
          <div className="image-container">
            <img className="login-image" src={logo} alt={'logo'} />
          </div>
          <div className="form-container">
            <div className="field-container field">
              <input onChange={usernameHandler} type="input" className="form-input" placeholder="Login" name="login" required />
              <label htmlFor="login" className="form-label">Login</label>
            </div>
            <div className="field-container field">
              <input onChange={passwordHandler} type="password" className="form-input" placeholder="Senha" name="password" required
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    loginHandler();
                  }
                }} />
              <label htmlFor="password" className="form-label">Senha</label>
            </div>
            <div className="error-message">
              {error}
            </div>
          </div>
          <div className="button-container">
            <div onClick={loginHandler} className="button" >Fazer Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
