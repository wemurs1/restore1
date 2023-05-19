import './../../app/layout/auth.css';
import * as FaIcon from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import agent from '../../app/api/agent';
import { useState } from 'react';

export default function Register() {
  const [validationErrors, setValidationErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onTouched',
  });

  return (
    <div className='Auth-form-container'>
      <form
        className='Auth-form'
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data).catch((error) =>
            setValidationErrors(error)
          )
        )}
      >
        <div className='Auth-form-content'>
          <h3 className='Auth-form-icon'>
            <FaIcon.FaLock />
          </h3>
          <h3 className='Auth-form-title'>Register</h3>
          <div className='form-group mt-3'>
            <label>User name</label>
            <input
              type='text'
              autoFocus
              {...register('username', { required: 'Username is required' })}
              className={`form-control mt-1 ${
                errors.username ? 'is-invalid' : ''
              }`}
              placeholder='Enter Username'
            />
            <div className='invalid-feedback'>
              {errors.username?.message as string}
            </div>
          </div>
          <div className='form-group mt-3'>
            <label>Email Address</label>
            <input
              type='text'
              {...register('email', { required: 'Email is required' })}
              className={`form-control mt-1 ${
                errors.email ? 'is-invalid' : ''
              }`}
              placeholder='Enter Email'
            />
            <div className='invalid-feedback'>
              {errors.email?.message as string}
            </div>
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              {...register('password', { required: 'Password is required' })}
              className={`form-control mt-1 ${
                errors.username ? 'is-invalid' : ''
              }`}
            />
            <div className='invalid-feedback'>
              {errors.password?.message as string}
            </div>
          </div>
          {validationErrors.length > 0 && (
            <Alert variant='error'>
              <Alert.Heading className='text-danger'>
                Validation Errors
              </Alert.Heading>
              <ListGroup>
                {validationErrors.map((error) => (
                  <ListGroup.Item key={error} className='text-danger'>
                    {error}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Alert>
          )}

          <div className='d-grid gap-2 mt-3'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={!isValid}
            >
              {isSubmitting && (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              )}
              Submit
            </button>
          </div>
          <div className='text-end mt-2'>
            <Link to='/login'>Already have an account? Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
