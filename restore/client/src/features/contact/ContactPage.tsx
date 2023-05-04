import { useDispatch, useSelector } from 'react-redux';
import {
  CounterState,
  decrement,
  increment,
} from './counterReducer';
import { Fragment } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function ContactPage() {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);

  return (
    <Fragment>
      <h2>{title}</h2>
      <h5>The data is: {data}</h5>
      <ButtonGroup>
        <Button variant='danger' onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button variant='primary' onClick={() => dispatch(increment())}>
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
