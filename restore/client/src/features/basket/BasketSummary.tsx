import { Fragment } from 'react';
import { useStoreContext } from '../../app/context/StoreContext';

export default function BasketSummary() {
  const { basket } = useStoreContext();

  if (!basket) return <Fragment></Fragment>;

  const subtotal = basket.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 100 ? 0 : 5;

  return (
    <Fragment>
      <div className='d-flex justify-content-between'>
        <div>Subtotal</div>
        <div>${(subtotal / 100).toFixed(2)}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>Delivery fee *</div>
        <div>${(deliveryFee / 100).toFixed(2)}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>Total</div>
        <div>${((subtotal + deliveryFee) / 100).toFixed(2)}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <div style={{ fontStyle: 'italic' }}>
          * Orders over $100 qualify for free delivery
        </div>
      </div>
    </Fragment>
  );
}
