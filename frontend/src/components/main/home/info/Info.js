import React, {Component} from "react";
import {Row, Col, Button} from "react-bootstrap";
import "./Info.css"
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import placeholder from "../../../../assets/placeholder.png"
import clockImg from "../../../../assets/Group 2.png"
import sunImg from "../../../../assets/sun.png"
import axios from "axios";
import Switch from "./switch-button/Switch"

class Info extends Component {

    constructor(props) {
        super(props)
        this.state={
            temp:"-",
            hasLineUp:null,
            lineUp: null
        }
    }

    componentDidMount() {
        this.getTemperature(this.props.event.locationCity, this.props.event.date)
        this.setState({hasLineUp:false})
    }

    getTemperature(city, date) {

        let temp=null;
        let string='?key=a32f202e927744fd957143307192410&limit=1&q='+city+'&date='+date+'&format=json'

        const HTTP = axios.create({
            baseURL: "https://api.worldweatheronline.com/premium/v1/weather.ashx",
        });

        HTTP.get(string).then((response) => {
            if(response.data.data.weather!=null) {
                temp=response.data.data.weather[0].avgtempC
                this.setState({temp:temp+'°C'})
            }
        });
    }

    handleLineUp() {
        if(!this.state.hasLineUp)
            this.setState({hasLineUp:true, lineUp:<p>Not available at the moment</p>})
        else this.setState({hasLineUp:false, lineUp:null})
        console.log(this.state.hasLineUp)
    }

    render() {

        const Aux = props => props.children;
        let val = this.state.hasLineUp

        return (

            <Aux>
                {this.props.showTitle ? (
                    <Row>

                        <Col className={"font-title-info"}>
                            Info
                        </Col>

                        <Col className={"shop-col-info"}>
                            <a href={this.props.event.url}>
                                <Button bsPrefix={"shop-button-info"} variant={"link"}/>
                            </a>
                        </Col>
                    </Row>) : (null)}
                <Row>
                    <Col className={"font-name-info"}>
                        {this.props.event.eventName}
                    </Col>
                </Row>
                <Row>
                    <Col style={{height: "8.5em"}}>
                        <img src={this.props.event.img} className={"event-image-info"} alt="event"/>
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
                                                    <Col className={"col-weather-info"} md={4}>
                                                        <img src={sunImg} className={"clock-info"} alt="sun"/>
                                                        <p className={"font-api-info space-gate-info"}>CLIMATE</p>
                                                        <p className={"font-time-info"}> {this.state.temp}</p>
                                                    </Col>
                                                    <Col className={"col-gate-info"} md={4}>
                                                        <img src={clockImg} className={"clock-info"} alt="clock"/>
                                                        <p className={"font-api-info space-gate-info"}>GATE</p>
                                                        <p className={"font-time-info"}>{this.props.event.time}</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <img src={placeholder} className={"placeholder-info"}
                                                             alt="placeholder"/>
                                                        <p className={"font-api-info space-loc-info"}>LOCATION</p>
                                                        <Row>
                                                            <Col className={"font-addr-info"}>
                                                                {this.props.event.locationAddress}
                                                            </Col>
                                                        </Row>
                                                        <a target="_blank" rel="noopener noreferrer"
                                                           href={"https://maps.google.com/?q=" + this.props.event.locationAddress}>
                                                            <Button bsPrefix={"button-maps-event"}>
                                                                <b style={{color: "white"}}>MAPS</b>
                                                            </Button>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col className={"font-api-info"}>
                        <strong>LINE UP</strong>
                    </Col>
                    <Col className={"lineup-switch-info"} style={{height: "2em"}}>
                        <Switch className={"switch-info"} isChecked={val} onChange={() => this.handleLineUp()}/>
                    </Col>
                </Row>
                <Row>
                    <Col className={"lineup-col-info"}>
                        {this.state.lineUp}
                    </Col>
                </Row>
                <Row>
                    <Col className={"font-api-info ticketprice-info"}>
                        <strong>TICKET ORIGINAL PRICE</strong>
                    </Col>
                </Row>
                <Row>
                    <Col className={"font-api-info ticketprice-info"}>
                        {this.props.event.price} {this.props.event.priceCurrency}
                    </Col>
                </Row>
                <Row>
                    <Col style={{left: "1.7em"}}>
                        <a href={this.props.event.url} target="_blank" rel="noopener noreferrer">
                            <Button bsPrefix={"button-maps-event"}>
                                <b style={{color: "white"}}>TICKETMASTER</b>
                            </Button>
                        </a>
                    </Col>
                </Row>

            </Aux>

        )
    }
}

export default Info