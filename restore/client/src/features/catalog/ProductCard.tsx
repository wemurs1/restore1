import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  return (
    <>
      <Card style={{ height: 400, marginTop: 20 }} className='shadow-sm'>
        <Card.Header style={{ height: 60 }}>
          <Row>
            <Col xs={2}>
              <div
                className='btn btn-secondary btn-sm'
                style={{ borderRadius: '50%' }}
              >
                {product.name.charAt(0).toUpperCase()}
              </div>
            </Col>
            <Col
              xs={10}
              style={{ fontWeight: 'bold' }}
              className='text-primary'
            >
              {product.name}
            </Col>
          </Row>
        </Card.Header>
        <Card.Img
          variant='top'
          style={{ height: 200, width: 200, backgroundColor: '#d5f3fe' }}
          className='d-flex, mx-auto'
          src={product.pictureUrl}
          alt={product.name}
        />
        <Card.Body>
          <Card.Text as='h5' color='secondary'>
            {currencyFormat(product.price)}
          </Card.Text>
          <Card.Text>
            {product.brand} / {product.type}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: product.id }))
            }
          >
            {status.includes('pendingAddItem' + product.id) && (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            )}
            Add to cart
          </Card.Link>
          <Card.Link as={Link} to={`/catalog/${product.id}`}>
            View
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}
