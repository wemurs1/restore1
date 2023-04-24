import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container>
      <h3 className='mb-3'>
        Oops - we could not find what you are looking for...
      </h3>
      <hr />
      <Link to='/catalog'>
        <button className='btn btn-primary w-100'>Go back to shop</button>
      </Link>
    </Container>
  );
}
