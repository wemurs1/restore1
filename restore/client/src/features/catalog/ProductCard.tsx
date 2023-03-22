import { Card, Col, Row } from 'react-bootstrap';
import { Product } from '../../app/models/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card style={{ height: 350 }} className='shadow-sm'>
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
            <Col xs={10}>{product.name}</Col>
          </Row>
        </Card.Header>
        <Card.Img
          variant='top'
          style={{ height: 140, width: 140 }}
          className='d-block, mx-auto'
          src={product.pictureUrl}
          alt={product.name}
        />
        <Card.Body>
          <Card.Text as='h5' color='secondary'>
            {product.price}
          </Card.Text>
          <Card.Text as='body'>
            {product.brand} / {product.type}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link>Add to cart</Card.Link>
          <Card.Link>View</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}
