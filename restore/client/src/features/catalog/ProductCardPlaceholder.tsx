import { Card, Col, Placeholder, Row } from 'react-bootstrap';

export default function ProductCardPlaceholder() {
  return (
    <>
      <Card style={{ height: 400, marginTop: 20 }} className='shadow-sm'>
        <Card.Header style={{ height: 60 }}>
          <Row>
            <Col xs={2}>
              <div
                className='btn btn-secondary btn-sm'
                style={{ borderRadius: '50%' }}
              >
                <Placeholder xs={1}/>
              </div>
            </Col>
            <Col
              xs={10}
              style={{ fontWeight: 'bold' }}
              className='text-primary'
            >
              <Placeholder xs={11}/>
            </Col>
          </Row>
        </Card.Header>
        <Placeholder
          as={Card.Img}
          variant='top'
          style={{ height: 200, width: 200, backgroundColor: '#d5f3fe' }}
          className='d-flex, mx-auto'
        />
        <Card.Body>
          <Card.Text as='h5' color='secondary'>
            <Placeholder xs={4}/>
          </Card.Text>
          <Card.Text>
            <Placeholder xs={7}/>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link
          >
            Add to cart
          </Card.Link>
          <Card.Link>
            View
          </Card.Link>
        </Card.Body>

      </Card>
    </>
  );
}
