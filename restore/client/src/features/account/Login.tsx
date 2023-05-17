import { useState } from 'react';
import './../../app/layout/auth.css';
import * as FaIcon from 'react-icons/fa';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';

export default function Login() {
  const [loginForm, setLoginForm] = useState({ userName: '', password: '' });

  function handleSubmit(event: any) {
    event.preventDefault();
    agent.Account.login(loginForm);
  }

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-icon'>
            <FaIcon.FaLock />
          </h3>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>User name</label>
            <input
              type='text'
              name='userName'
              className='form-control mt-1'
              placeholder='Enter Username'
              value={loginForm.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='form-control mt-1'
              placeholder='Enter password'
              value={loginForm.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
          <div className='text-end mt-2'>
            <Link to='/register'>Don't have an account? Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
