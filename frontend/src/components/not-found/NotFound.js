import React, { Component } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './NotFound.css';
import { Link } from 'react-router-dom';
import background from '../../assets/Desktop_HD.png';

class NotFound extends Component {

render() {
    return ( 
    <div id="root">
        <img className="img-fluid fit-not-found" src={background} alt="background"></img>
        <div className="main-not-found">
            <Container>
                <Row>
                    <Col>
                        <h1 className="font-title-not-found">
                            OPS! LOOKS LIKE THIS PAGE DOESN'T EXIST
                        </h1>
                    </Col>
                    <Col className="button-login">
                        <Link to='/'>
                            <Button variant="primary" style={{"font-family": "Libre Franklin, sans-serif", "font-weight" : "80px", "font-size": "15px", "width": "200px", "border-radius": "10px", "position": "relative", "top": "90px"}}>
                                BACK TO HOME
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    </div> 
    );
  }
}

export default NotFound;