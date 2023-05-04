import { Container, Spinner, Table } from 'react-bootstrap';
import * as FaIcon from 'react-icons/fa';
import BasketSummary from './BasketSummary';
import { currencyFormat } from '../../app/util/util';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

export default function BasketPage() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

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
                  {status === 'pendingRemoveItem' + item.productId + 'rem' ? (
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
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: 'rem',
                          })
                        )
                      }
                    ></FaIcon.FaMinus>
                  )}
                  <span>{item.quantity}</span>
                  {status === 'pendingAddItem' + item.productId ? (
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
                        dispatch(
                          addBasketItemAsync({ productId: item.productId })
                        )
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
                  {status === 'pendingRemoveItem' + item.productId + 'del' ? (
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
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: 'del',
                          })
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
