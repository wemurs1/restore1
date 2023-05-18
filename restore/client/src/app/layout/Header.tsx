import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as FaIcon from 'react-icons/fa';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

interface Props {
  darkMode: boolean;
  onChange: () => void;
}

function Header({ darkMode, onChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className='d-flex flex-row align-items-center justify-content-between p-3 px-4 mb-3 
    bg-primary border-bottom fixed-top shadow-sm'
    >
      <div className='row'>
        <div className='col-8 mt-0'>
          <NavLink to='/'>
            <div style={{ color: 'white', textDecoration: 'none' }}>
              RE-STORE
            </div>
          </NavLink>
        </div>
        <div className='col-4'>
          <div className='form-check form-switch'>
            <input
              className='form-check-input bg-secondary my-0'
              type='checkbox'
              role='switch'
              id='flexSwitchCheckDefault'
              checked={!darkMode}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          verticalAlign: 'center',
        }}
      >
        {midLinks.map(({ title, path }) => (
          <li key={path}>
            <NavLink
              style={{ color: 'white', textDecoration: 'none' }}
              className={'me-3 h6'}
              to={path}
            >
              {title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          verticalAlign: 'center',
        }}
      >
        <li>
          <NavLink to='/basket'>
            <Button size='lg' style={{ position: 'relative' }}>
              <FaIcon.FaShoppingCart style={{ color: 'white' }} />
              <div
                className='cart-no'
                style={{ color: 'blue', fontSize: 'small' }}
              >
                {itemCount}
              </div>
            </Button>
          </NavLink>
        </li>
        {user ? (
          <SignedInMenu />
        ) : (
          <>
            {rightLinks.map(({ title, path }) => (
              <li key={path}>
                <NavLink
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    verticalAlign: 'bottom',
                  }}
                  className={'me-3 h6'}
                  to={path}
                >
                  {title.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
