import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { currencyFormat } from '../../app/util/util';
import { Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';

function ProductDetails() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: parseInt(id!),
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: parseInt(id!),
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes('pending'))
    return <LoadingComponent message='Loading product...' />;

  if (!product) return <NotFound />;

  return (
    <div className='row'>
      <div className='col-6'>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </div>
      <div className='col-6'>
        <h3 style={{ fontWeight: 'bold', fontSize: '2.5em' }}>
          {product.name}
        </h3>
        <hr className='mb-2' />
        <h4
          style={{ fontWeight: 'bold', fontSize: '1.5em' }}
          className='text-primary'
        >
          {currencyFormat(product.price)}
        </h4>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Name</div>
          </div>
          <div className='col-8'>
            <div>{product.name}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Description</div>
          </div>
          <div className='col-8'>
            <div>{product.description}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Type</div>
          </div>
          <div className='col-8'>
            <div>{product.type}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Brand</div>
          </div>
          <div className='col-8'>
            <div>{product.brand}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Quantity in Stock</div>
          </div>
          <div className='col-8'>
            <div>{product.quantityInStock}</div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-6'>
            <Form.Group controlId='formBasicQuantity'>
              <Form.Label>Quantity in cart</Form.Label>
              <Form.Control
                type='number'
                placeholder='Quantity'
                value={quantity}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div className='col-6'>
            <button
              className='btn btn-primary w-100'
              style={{ height: '40px', marginTop: '30px' }}
              onClick={handleUpdateCart}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
            >
              {status.includes('pending') && (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              )}
              {item ? 'Update Quantity' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
