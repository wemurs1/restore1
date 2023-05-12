import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';
import { useState } from 'react';
import { debounce } from 'lodash';

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <Form.Group controlId='formProductSearch'>
      <Form.Label>Search Products</Form.Label>
      <Form.Control
        type='text'
        placeholder='product...'
        className='w-100'
        value={searchTerm || ''}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    </Form.Group>
  );
}
