import { Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg='primary' fixed='top'>
      <div className='container-fluid'>
        <h6 style={{ color: 'white' }}>RE-STORE</h6>
      </div>
    </Navbar>
  );
}

export default Header;
