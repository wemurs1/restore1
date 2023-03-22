import { Button, Container } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

interface Props {
  products: Product[];
  addProduct: () => void;
}

function Catalog({ products, addProduct }: Props) {
  return (
    <Container style={{ marginTop: '80px' }}>
      <ProductList products={products} />
      <Button onClick={addProduct} variant='primary'>
        Add Product
      </Button>
    </Container>
  );
}

export default Catalog;
