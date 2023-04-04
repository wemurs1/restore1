import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../app/models/product';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <div className='row'>
      <div className='col-6'>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </div>
      <div className='col-6'>
        <h3 style={{ fontWeight: 'bold', fontSize: '2.5em' }}>
          {product.name}
        </h3>
        <hr className='mb-2' />
        <h4
          style={{ fontWeight: 'bold', fontSize: '1.5em' }}
          className='text-primary'
        >
          ${(product.price / 100).toFixed(2)}
        </h4>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Name</div>
          </div>
          <div className='col-8'>
            <div>{product.name}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Description</div>
          </div>
          <div className='col-8'>
            <div>{product.description}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Type</div>
          </div>
          <div className='col-8'>
            <div>{product.type}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Brand</div>
          </div>
          <div className='col-8'>
            <div>{product.brand}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{ fontWeight: 'bolder' }}>Quantity in Stock</div>
          </div>
          <div className='col-8'>
            <div>{product.quantityInStock}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
