import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const onChange = () => {
    setDarkMode(!darkMode);
    console.log(`darkMode=${darkMode}. Magic would happen here`);
  };

  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Header darkMode={darkMode} onChange={onChange} />
      <Container style={{ marginTop: '40px' }}>
        <Outlet />
      </Container>
    </div>
  );
}
