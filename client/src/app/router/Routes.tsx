import { Navigate, createBrowserRouter } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import App from '../layout/App';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import RequireAuth from './RequireAuth';
import OrderPage from '../../features/orders/OrderPage';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <CheckoutWrapper /> },
          { path: 'orders', element: <OrderPage /> },
        ],
      },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:id', element: <ProductDetails /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);