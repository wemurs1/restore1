import { Container, Spinner, Table } from 'react-bootstrap';
import * as FaIcon from 'react-icons/fa';
import { useStoreContext } from '../../app/context/StoreContext';
import { useState } from 'react';
import agent from '../../app/api/agent';

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
                  {loading && (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  )}
                  <FaIcon.FaMinus
                    className='text-danger me-2'
                    onClick={() => handleRemoveItem(item.productId)}
                  ></FaIcon.FaMinus>
                  <span>{item.quantity}</span>
                  <FaIcon.FaPlus
                    className='text-success ms-2'
                    onClick={() => handleAddItem(item.productId)}
                  ></FaIcon.FaPlus>
                </div>
              </td>
              <td>
                <div className='mt-2'>
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </div>
              </td>
              <td>
                <div className='mt-2'>
                  {loading && (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  )}
                  <FaIcon.FaTrash
                    className='text-danger'
                    onClick={() =>
                      handleRemoveItem(item.productId, item.quantity)
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
