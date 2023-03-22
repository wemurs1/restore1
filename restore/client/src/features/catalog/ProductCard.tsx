import { Card, Col, Row } from 'react-bootstrap';
import { Product } from '../../app/models/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card className='shadow-sm'>
        <Row>
          <Col xs={2}>
            <div
              className='ms-1 btn btn-secondary btn-circle'
              style={{ borderRadius: '50%' }}
            >
              {product.name.charAt(0).toUpperCase()}
            </div>
          </Col>
          <Col xs={10}>{product.name}</Col>
        </Row>
        <Card.Img variant='top' src={product.pictureUrl} alt={product.name} />
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
