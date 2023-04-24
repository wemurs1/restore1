import { Button, ButtonGroup, Container } from 'react-bootstrap';
import agent from '../../app/api/agent';

function AboutPage() {
  return (
    <Container>
      <h2>Errors for testing purposes</h2>
      <ButtonGroup>
        <Button
          variant='primary'
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant='primary'
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant='primary'
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant='primary'
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }
        >
          Test 500 Error
        </Button>
        <Button
          variant='primary'
          onClick={() =>
            agent.TestErrors.getValidationError().catch((error) =>
              console.log(error)
            )
          }
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default AboutPage;
