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
    <Fragment>
      <Header darkMode={darkMode} onChange={onChange} />
      <Catalog />
    </Fragment>
  );
}

export default App;
