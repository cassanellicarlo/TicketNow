import React, {Component} from "react";
import {Col, Row, Container, Card} from "react-bootstrap";
import './Credit.css';
import credit from '../../../../assets/credit.png';

class Credit extends Component{

    render() {
        return(
            <Col className="page-credit">
                <Row>
                    <Col className={"title-credit"}>
                        Profile
                    </Col>
                </Row>
                <Row>
                    <Col style={{height: "8.5em", textAlign:"center"}} >
                        <div className="container-credit">
                            <img src={credit} style={{"width":"90%"}} alt="credit"/>
                            <div className="centered-credit">€ 5,00</div>
                        </div>
                    </Col>
                </Row>
                <Row style={{textAlign: "center"}}>
                    <Col>
                        <Container>
                            <Row>
                                <Col md={12} className={"card-col-info"}>
                                    <Card className={"card-info"}>
                                        <Card.Body>
                                            <Container>
                                                <Row className={"row-api-info"}>
                                                    <Col md={3}>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}>WELCOME<br/></p>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"black"}}>€ 5,00</p>
                                                        <hr width="100%" style={{"borderTop":"0.5em solid #852D50"}}></hr>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}>EXPIRE DATE<br/></p>

                                                    </Col>
                                                    <Col md={3}>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}><br/></p>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"transparent"}}>.</p>
                                                        <hr width="100%" style={{"borderTop":"0.5em solid #ABABAB"}}></hr>
                                                        <p className={"font-api-info space-gate-info"}>€ 10,00</p>
                                                    </Col>
                                                    <Col md={3}>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}><br/></p>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"transparent"}}>.</p>
                                                        <hr width="100%" style={{"borderTop":"0.5em solid #ABABAB"}}></hr>
                                                        <p className={"font-api-info space-loc-info"}>€ 15,00</p>
                                                    </Col>
                                                    <Col md={3}>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}>EXPIRE DATE<br/></p>
                                                        <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"black"}}>31.12.2019</p>
                                                        <hr width="100%" style={{"borderTop":"0.5em solid #ABABAB"}}></hr>
                                                        <p className={"font-api-info space-gate-info"}>€ 20,00</p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <p style={{"fontFamily": "Helvetica Neue, sans-serif", "textAlign":"left","color":"grey"}}>HOW TO EARN CREDIT</p>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <div style={{"marginLeft":"1em","textAlign": "left", "font-family":"Helvetica Neue, sans-serif"}}>
                                            <b>JOIN US</b><br/>
                                        At each expense margin you will receive a discount to use on ticketone.<br/>
                                        Continue to use the app and buy on our community.<br/>
                                        Details
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <div style={{"marginLeft":"1em","textAlign": "left", "font-family":"Helvetica Neue, sans-serif"}}>
                                            <b>SHARE THE LOVE</b><br/>
                                            Tell your friends about us. If they sign up with your invite code, your earn
                                            credit..<br/>
                                        Details
                                        </div>
                                    </Card>
                                </Col>
                                <br/>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Credit