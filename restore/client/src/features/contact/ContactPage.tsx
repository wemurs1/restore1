import { Fragment } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { decrement, increment } from './counterSlice';

function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <Fragment>
      <h2>{title}</h2>
      <h5>The data is: {data}</h5>
      <ButtonGroup>
        <Button variant='danger' onClick={() => dispatch(decrement(1))}>
          Decrement
        </Button>
        <Button variant='primary' onClick={() => dispatch(increment(1))}>
          Increment
        </Button>
        <Button variant='secondary' onClick={() => dispatch(increment(5))}>
          Increment 5
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}

export default ContactPage;
