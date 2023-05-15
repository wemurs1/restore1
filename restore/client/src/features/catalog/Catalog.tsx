import { useEffect } from 'react';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from './catalogSlice';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import AppPagination from '../../app/components/AppPagination';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' },
];

function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <LoadingComponent message='Loading products...' />;

  return (
    <div className='row'>
      <div className='col-3'>
        <div className='mb-3 mt-3' style={{ backgroundColor: 'white' }}>
          <ProductSearch />
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
          />
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ brands: items }));
            }}
          />
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ types: items }));
            }}
          />
        </div>
      </div>
      <div className='col-9'>
        <ProductList products={products} />
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </div>
    </div>
  );
}

export default Catalog;
