import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container style={{ marginTop: '40px' }}>
      <ProductList products={products} />
    </Container>
  );
}

export default Catalog;
