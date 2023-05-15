import { Col, Container, Row } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardPlaceholder from './ProductCardPlaceholder';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col xs={4} className='pb-4' key={product.id}>
            {!productsLoaded ? (
              <ProductCardPlaceholder />
            ) : (
              <ProductCard product={product} />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
