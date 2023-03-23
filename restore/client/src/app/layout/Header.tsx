import { Navbar } from 'react-bootstrap';

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
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
