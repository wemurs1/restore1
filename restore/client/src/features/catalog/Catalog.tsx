import { useEffect } from 'react';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
} from './catalogSlice';

function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, productsLoaded, filtersLoaded]);

  if (status.includes('pending'))
    return <LoadingComponent message='Loading products...' />;

  return <ProductList products={products} />;
}

export default Catalog;
