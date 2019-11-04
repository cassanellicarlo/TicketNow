import React, {Component} from 'react';
import {Col, Row, Button} from "react-bootstrap";
import profile from '../../../assets/Asset 2Profile.png';
import home from '../../../assets/Group 5.png';
import search from '../../../assets/Group 9.png';
import community from '../../../assets/Group 20.png';
import ticketnow from '../../../assets/TICKETNOW.png';
import piggie from '../../../assets/Asset 16pork1 Copy.png'
import './Navbar.css';
import {Link} from "react-router-dom";

class Navbar extends Component {

    showPiggie(){
        if(this.props.piggie===false)
            return (
            <img src={profile} alt="profile" className="image-navbar">
            </img>
            )
            else
            return (
                <img src={piggie} alt="profile" className="image-navbar">
                </img>
                )
    }

    render() {
        return (
            <Col className="column-navbar" md={1}>
                <Row style={{height: "1em"}}>
                </Row>
                <Row>
                    <Link to={"/profile"}>
                        <Button variant="link" bsPrefix="button-navbar" >
                            {this.showPiggie()}
                        </Button>
                    </Link>
                </Row>
                <Row style={{height: "2.5em"}}>
                </Row>
                <Row>
                    <Link to={"/"}>
                        <Button variant="link" bsPrefix="button-navbar">
                            <img src={home} alt="home" className="image-navbar">
                            </img>
                        </Button>

                    </Link>

                </Row>
                <Row style={{height: "1em"}}>
                </Row>
                <Row>
                    <Link to={"/search"}>

                        <Button variant="link" bsPrefix="button-navbar">
                            <img src={search} alt="search" className="image-navbar">
                            </img>
                        </Button>
                    </Link>
                </Row>
                <Row style={{height: "1em"}}>
                </Row>
                <Row>
                    <Link to={"/community"}>
                        <Button variant="link" bsPrefix="button-navbar">
                            <img src={community} alt="community" className="image-navbar">
                            </img>
                        </Button>
                    </Link>
                </Row>
                <Row >
                </Row>
                <Row className="tnlogo-col-navbar">
                    <Col>

                        <img src={ticketnow} alt="ticketnow" className={"tnlogo-navbar"}>
                        </img>

                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Navbar;