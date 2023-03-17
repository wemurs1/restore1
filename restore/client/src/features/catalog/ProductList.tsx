import { ListGroup } from 'react-bootstrap';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <ListGroup>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ListGroup>
  );
}
