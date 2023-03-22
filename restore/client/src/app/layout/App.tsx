import { Fragment, useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevstate) => [
      ...prevstate,
      {
        id: prevstate.length + 101,
        name: 'product' + (prevstate.length + 1),
        price: prevstate.length * 100 + 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200',
      },
    ]);
  }

  return (
    <Fragment>
      <Header />
      <Catalog products={products} addProduct={addProduct} />
    </Fragment>
  );
}

export default App;
