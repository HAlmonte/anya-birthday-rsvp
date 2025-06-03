import './App.css';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

function App() {

  const notyf = new Notyf();

  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState(0);

  function handleSubmit(e) {

        e.preventDefault();

        fetch('https://anya-birthday-rsvp.onrender.com/guest-rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                guestCount: guestCount
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === 'Guest added successfully') {

                setName("");
                setGuestCount(0);

                notyf.success("RSVP Confirmed");
            }
        })
    }

  return (
    <Container fluid>
      <Row className="pt-5">
        <Col className="pt-3">
          <h1 className="text-center title">Anya Turns One</h1>
          <p className="text-center subtitle">When: August 24, 2025</p>
        </Col>
      </Row>

      <Row className="pt-3">
        <Col lg={4} className="p-5 left-form d-none d-lg-block"></Col>

        <Col xs={10} md={6} lg={4} className="p-5 rsvp-form ">
          <h4 className="text-center mt-md-2 mb-md-5 details-title">
            Add your details to join the magical celebration!
          </h4>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column xs={3} md={4} className="input-text">
                Name
              </Form.Label>
              <Col xs={9} md={8}>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="e.g. Anya Katana"
                  className="details-text"
                  value={name} 
                  onChange={e => {setName(e.target.value)}}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-5" controlId="guests">
              <Form.Label column xs={7} md={6} className="input-text">
                Number of Guests
              </Form.Label>
              <Col xs={5} md={6}>
                <Form.Control
                  size="sm"
                  type="number"
                  min="1"
                  max="10"
                  className="details-text"
                  value={guestCount} 
                  onChange={e => {setGuestCount(e.target.value)}}
                />
              </Col>
            </Form.Group>

            <Button type="submit" className="btn-fairy w-100">
              Send RSVP
            </Button>
          </Form>
        </Col>

        <Col md={5} lg={4} className="p-5 right-form d-none d-md-block"></Col>
      </Row>
    </Container>
  )
}

export default App;
