import { Fragment, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const onChange = () => {
    setDarkMode(!darkMode);
    console.log(`darkMode=${darkMode}. Magic would happen here`);
  };

  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Header darkMode={darkMode} onChange={onChange} />
      <Catalog />
    </div>
  );
}

export default App;
