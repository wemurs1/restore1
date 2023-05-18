import './../../app/layout/auth.css';
import * as FaIcon from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUserAsync } from './accountSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onTouched',
  });

  async function submitForm(data: FieldValues) {
    await dispatch(signInUserAsync(data));
    navigate('/catalog');
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleSubmit(submitForm)}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-icon'>
            <FaIcon.FaLock />
          </h3>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>User name</label>
            <input
              type='text'
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
            <Link to='/register'>Don't have an account? Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
