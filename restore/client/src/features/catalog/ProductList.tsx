import { Col, Container, Row } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col xs={4} className='pb-4' key={product.id}>
            <ProductCard product={product} />{' '}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
