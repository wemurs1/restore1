import { Container, Spinner, Table } from 'react-bootstrap';
import * as FaIcon from 'react-icons/fa';
import { useState } from 'react';
import agent from '../../app/api/agent';
import BasketSummary from './BasketSummary';
import { currencyFormat } from '../../app/util/util';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeItem, setBasket } from './basketSlice';

export default function BasketPage() {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);
  const [status, setStatus] = useState({
    loading: false,
    name: '',
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name: name });
    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name: name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeItem({ productId, quantity })))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  if (!basket) return <h3>Your basket is empty</h3>;

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {basket.items.map((item) => (
            <tr key={item.productId}>
              <td>
                <div className='d-flex text-center align-items-center'>
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>
                <div className='mt-2'>${(item.price / 100).toFixed(2)}</div>
              </td>
              <td>
                <div className='d-flex text-center align-items-center mt-2'>
                  {status.loading &&
                  status.name === 'minus' + item.productId ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    <FaIcon.FaMinus
                      className='text-danger me-2'
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          'minus' + item.productId
                        )
                      }
                    ></FaIcon.FaMinus>
                  )}
                  <span>{item.quantity}</span>
                  {status.loading && status.name === 'plus' + item.productId ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    <FaIcon.FaPlus
                      className='text-success ms-2'
                      onClick={() =>
                        handleAddItem(item.productId, 'plus' + item.productId)
                      }
                    ></FaIcon.FaPlus>
                  )}
                </div>
              </td>
              <td>
                <div className='mt-2'>
                  {currencyFormat(item.price * item.quantity)}
                </div>
              </td>
              <td>
                <div className='mt-2'>
                  {status.loading &&
                  status.name === 'delete' + item.productId ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    <FaIcon.FaTrash
                      className='text-danger'
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          item.quantity,
                          'delete' + item.productId
                        )
                      }
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='row'>
        <div className='col-6'></div>
        <div className='col-6'>
          <BasketSummary />
          <Link to='/checkout'>
            <button className='btn btn-primary w-100 mt-2'>Checkout</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
