import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const onChange = () => {
    setDarkMode(!darkMode);
    console.log(`darkMode=${darkMode}. Magic would happen here`);
  };

  return (
    <div style={{ backgroundColor: '#eaeaea', height: '100vh' }}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <Header darkMode={darkMode} onChange={onChange} />
      <Container style={{ marginTop: '95px' }}>
        <Outlet />
      </Container>
    </div>
  );
}
