import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card style={{ height: 450, marginTop: 20 }} className='shadow-sm'>
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
          style={{ height: 250, width: 250, backgroundColor: '#d5f3fe' }}
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
          <Card.Link onClick={() => handleAddItem(product.id)}>
            {loading && (
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
