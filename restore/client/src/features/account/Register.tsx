import './../../app/layout/auth.css';
import * as FaIcon from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spinner } from 'react-bootstrap';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onTouched',
  });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error });
        } else if (error.includes('Email')) {
          setError('email', { message: error });
        } else if (error.includes('Username')) {
          setError('username', { message: error });
        }
      });
    }
  }

  return (
    <div className='Auth-form-container'>
      <form
        className='Auth-form'
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful - you can now login');
              navigate('/login');
            })
            .catch((error) => handleApiErrors(error))
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
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                  message: 'Not a valid email address',
                },
              })}
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
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                  message: 'Password does not meet complexity requirements',
                },
              })}
              className={`form-control mt-1 ${
                errors.username ? 'is-invalid' : ''
              }`}
            />
            <div className='invalid-feedback'>
              {errors.password?.message as string}
            </div>
          </div>
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
