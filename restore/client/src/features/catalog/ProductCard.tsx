import { ListGroup, Image } from 'react-bootstrap';
import { Product } from '../../app/models/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <ListGroup.Item key={product.id} className='d-flex'>
      <Image
        style={{ height: '50px' }}
        roundedCircle
        src={product.pictureUrl}
      ></Image>
      <h4 className='ms-4'>
        {product.name} - {product.price}
      </h4>
    </ListGroup.Item>
  );
}
