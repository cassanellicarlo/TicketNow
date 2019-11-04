import React, {Component} from "react";
import {Col, Row, ToggleButtonGroup, ButtonToolbar, Button} from "react-bootstrap";
import SpotifyService from '../../../../services/spotify-services/SpotifyService';
import './Profile.css';
import Container from "react-bootstrap/Container";

class Profile extends Component{

    constructor(props) {
        super(props)
        this.state= {
            albums:[],
            artists:[]
        }
    }

    componentDidMount(){
        this.setState({artists:SpotifyService.getFavourites(), albums: SpotifyService.getAlbums()})
    }

    render() {

        const Aux= props => props.children
        return (
            <Aux>
                <Row>
                    <Col className={"title-profile"}>
                        Profile
                    </Col>
                </Row>
                <Row>
                    <Container style={{width:"100%"}}>
                        <Col md={1}/>
                        <Col md={10} style={{height:"3em", textAlign:"center"}}>
                            <ButtonToolbar>
                                <ToggleButtonGroup type="checkbox" defaultValue={1}>
                                    <Button bsPrefix="buttons-profile">Public Albums</Button>
                                    <Button bsPrefix="buttons-profile">Private Albums</Button>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </Col>
                        <Col md={1}/>
                    </Container>
                </Row>
                <Row>
                    <Col className="view-column-profile">
                        {this.state.albums ? this.state.albums.map((url, index) => {
                            if (index % 5 === 0) return (
                                <Col key={Math.random()}>
                                    <Row key={Math.random()} className="artist-profile"><p>{url}</p></Row>
                                    <Row key={Math.random()} className="space-profile"></Row>
                                </Col>
                            )

                            else return (
                                <img key={Math.random()} className="album-profile" src={url} alt="album" hspace="10"/>
                            )
                        }) : (<p>You have no favorite albums</p>)
                        }
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Profile