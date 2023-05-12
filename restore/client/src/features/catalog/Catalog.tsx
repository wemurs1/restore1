import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
} from './catalogSlice';
import { Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import ProductSearch from './ProductSearch';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' },
];

function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [sortOptionSelected, setSortOptionSelected] = useState(
    sortOptions[0].value
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  function handleSortOptionSelectedChange(event: any) {
    if (event.target.value) setSortOptionSelected(event.target.value);
  }

  const handlePageClick = (event: any) => {
    console.log(event.selected);
    setCurrentPage(event.selected + 1);
  };

  if (status.includes('pending'))
    return <LoadingComponent message='Loading products...' />;

  return (
    <div className='row'>
      <div className='col-3'>
        <div className='mb-3 mt-3' style={{ backgroundColor: 'white' }}>
          <ProductSearch/>
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <Form.Group controlId='formSortSelect'>
            {sortOptions.map(({ value, label }, index) => {
              return (
                <Form.Check
                  key={index}
                  type='radio'
                  value={value}
                  label={label}
                  onChange={handleSortOptionSelectedChange}
                  checked={sortOptionSelected === value}
                />
              );
            })}
          </Form.Group>
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <Form.Group controlId='formSortSelect'>
            {brands.map((brand, index) => {
              return (
                <Form.Check
                  key={index}
                  type='checkbox'
                  value={brand}
                  label={brand}
                  onChange={handleSortOptionSelectedChange}
                />
              );
            })}
          </Form.Group>
        </div>
        <div className='mb-3 p-2' style={{ backgroundColor: 'white' }}>
          <Form.Group controlId='formSortSelect'>
            {types.map((type, index) => {
              return (
                <Form.Check
                  key={index}
                  type='checkbox'
                  value={type}
                  label={type}
                  onChange={handleSortOptionSelectedChange}
                />
              );
            })}
          </Form.Group>
        </div>
      </div>
      <div className='col-9'>
        <ProductList products={products} />
        <div className='row'>
          <div className='col-3'>
            <p>Displaying 1-6 of 20 items</p>
          </div>
          <div className='col-9'>
            <div>
              <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={10}
                previousLabel='< previous'
                renderOnZeroPageCount={null}
                className='react-paginate'
                forcePage={currentPage - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
