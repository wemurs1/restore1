import { ListGroup, ListGroupItem, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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
  return (
    <Navbar bg='primary' fixed='top'>
      <div className='container-fluid'>
        <div className='d-flex'>
          <h6 style={{ color: 'white' }}>RE-STORE</h6>
          <div className='form-check form-switch'>
            <input
              className='form-check-input bg-secondary ms-1'
              type='checkbox'
              role='switch'
              id='flexSwitchCheckDefault'
              checked={!darkMode}
              onChange={onChange}
            />
          </div>
          <ul style={{ display: 'flex', listStyle: 'none' }}>
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
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
