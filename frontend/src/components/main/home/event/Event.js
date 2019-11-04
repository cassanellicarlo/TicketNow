import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Event.css"
import Col from "react-bootstrap/Col";

class Event extends Component {
    render() {

        const event = {
            img: this.props.data.img,
            eventName: this.props.data.name,
            date: this.props.data.date,
            locationName: this.props.data.locationName,
            locationCountry: this.props.data.locationCountry,
            locationCity: this.props.data.locationCity,
            locationAddress: this.props.data.locationAddress,
            url: this.props.data.url,
            price: this.props.data.price,
            priceCurrency: this.props.data.priceCurrency,
            time: this.props.data.time,
        }

        return (
            <Col md={6}>
                <div className={"main-div-event"}>
                    <Card className="event">
                        <Card.Img className="img-event" src={event.img}/>
                        <Card.Body>
                            <Card.Title className="title-event"> {event.eventName} </Card.Title>
                            <Card.Title className="date-event"> {event.date} </Card.Title>
                            <Card.Text className="location-event">
                                {event.locationName}
                            </Card.Text>
                            <Card.Text className="time-event">
                                {event.time}
                            </Card.Text>
                            <Button bsPrefix="Binfo-event"
                                    onClick={() => this.props.onButtonClick(event)}>INFO</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        )
    }
}

export default Event