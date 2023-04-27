import { Container, Table } from 'react-bootstrap';
import * as FaIcon from 'react-icons/fa';
import { useStoreContext } from '../../app/context/StoreContext';

export default function BasketPage() {
  const {basket} = useStoreContext();

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
              <td>{item.name}</td>
              <td>${(item.price / 100).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${((item.price * item.quantity) / 100).toFixed(2)}</td>
              <td>
                <FaIcon.FaTrash className='text-danger' />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
