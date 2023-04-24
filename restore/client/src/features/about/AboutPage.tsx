import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  ListGroup,
} from 'react-bootstrap';
import agent from '../../app/api/agent';
import { useState } from 'react';

function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch((error) => setValidationErrors(error));
  }

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
        <Button variant='primary' onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert variant='error'>
          <Alert.Heading>Validation Errors</Alert.Heading>
          <ListGroup>
            {validationErrors.map((error) => (
              <ListGroup.Item key={error}>{error}</ListGroup.Item>
            ))}
          </ListGroup>
        </Alert>
      )}
    </Container>
  );
}

export default AboutPage;
