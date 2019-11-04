import React, {Component} from "react";
import Event from  "../event/Event"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class EventList extends Component {

    render() {
        return (
            <Container>
                <Row>           
                    {this.props.events.map((event) => (
                        <Event key={event.name} data={event} onButtonClick={(event)=>this.props.onButtonClick(event)}/>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default EventList;