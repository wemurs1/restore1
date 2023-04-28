import { Fragment } from 'react';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

export default function BasketSummary() {
  const { basket } = useStoreContext();

  if (!basket) return <Fragment></Fragment>;

  const subtotal = basket.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <Fragment>
      <div className='d-flex justify-content-between'>
        <div>Subtotal</div>
        <div>{currencyFormat(subtotal)}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>Delivery fee *</div>
        <div>{currencyFormat(deliveryFee)}</div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>Total</div>
        <div>{currencyFormat(subtotal + deliveryFee)}</div>
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
