//create error page wih image and message in next js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="py-5 d-flex justify-content-center align-items-center " style={{height:'100vh'}}>
      <Container>
        <Row className="pt-5">
          <Col className="text-center">
            <Image
              src="/assets/images/404.gif"
              width={300}
              height={300}
              alt="404"
              className="img-fluid"
            />
          </Col>
        </Row>
        <Row className="pb-5">
          <Col className="text-center">
          
            <h3>Page not found</h3>
            <p>
              The page you are looking for might have been removed, had its
              name changed or is temporarily unavailable.
            </p>
            <Link className="btn btn-secondary mt-4" href="/">
              Go to Homepage
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFound;
