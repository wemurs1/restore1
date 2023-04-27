import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

export default function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);

  const onChange = () => {
    setDarkMode(!darkMode);
    console.log(`darkMode=${darkMode}. Magic would happen here`);
  };

  if (loading) return <LoadingComponent message='Initialising app...' />;

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
