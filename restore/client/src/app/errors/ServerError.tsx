import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container>
      {state?.error ? (
        <Fragment>
          <h2 className='mb-3 text-secondary'>{state.error.title}</h2>
          <hr />
          <p>{state.error.detail || 'Internal server error'}</p>
        </Fragment>
      ) : (
        <h2 className='mb-3'>Server Error</h2>
      )}
    </Container>
  );
}
