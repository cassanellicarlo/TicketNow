import React, {Component} from 'react';
import {Row, Col, ToggleButtonGroup, ButtonToolbar, Button, Spinner, Alert} from "react-bootstrap";
import "./Home.css"
import EventList from "./event-list/EventList.js";
import Info from "./info/Info";
import SpotifyService from '../../../services/spotify-services/SpotifyService';
import EventService from "../../../services/EventService";
import Container from "react-bootstrap/Container";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            isArtists:true,
            events: [],
            //favouriteArtists: ["eminem", "post malone", "billie eilish", "red hot chili peppers"],
            //favouriteArtists: SpotifyService.getFavourites(),
            favouriteArtists: SpotifyService.getFavourites()==null?[]:SpotifyService.getFavourites(),
            loading: false,
            selectedEvent: null,
            alertMessage: false
        }
    }

    componentDidMount() {

        // Quando ha finito di scaricarsi i preferiti da spotify e messi nel local storage,
        // chiamo la funzione di callback definita qui sotto.
        //SpotifyService.getUserData();
        if (this.state.favouriteArtists.length === 0) {
            // Se è loggato con Spotify vado a prendere i preferiti da Spotify API
            if (SpotifyService.getToken()) {
                SpotifyService.getPrefers(() => {
                    this.setState({favouriteArtists: SpotifyService.getFavourites()});
                    this.artistsLoop();
                });
            }
            // Altrimenti mostro un messaggio che l'utente non ha ancora preferiti
            else {
                this.setState({alertMessage: true})
            }
        } else {
            this.artistsLoop();
        }

    }

    renderAlertMessage (){
        return (<Alert variant="warning"><strong>Non hai ancora artisti preferiti</strong></Alert>);
    }

    changeButton(buttonNumber) {
        if(buttonNumber===1) {
            this.setState({isArtists:true});
            this.artistsLoop();
        }
        else {
            this.setState({isArtists:false});
            this.getEventsByCountry();
        }
  }

    // When info button is clicked, set the selectedEvent
    handleInfo(event){
        this.setState({selectedEvent:event});
    }
    
    // Sleep for some time
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get Events By Country
    getEventsByCountry(){
        this.setState({loading:true});
        this.setState({events: []});
        EventService.getEventByCountry("US").then( (response)=>{

            let events = response.data._embedded.events;

            events.forEach((event)=>{
                this.updateEvents({
                    name: event.name,
                    date: event.dates.start.localDate,
                    time: event.dates.start.noSpecificTime===false?event.dates.start.localTime.substring(0,5):'',
                    locationName: event._embedded.venues[0].name, 
                    locationCountry: event._embedded.venues[0].country.name,
                    locationCity: event._embedded.venues[0].city.name,
                    locationAddress: event._embedded.venues[0].address.line1,
                    img: event.images[0].url,
                    url: event.hasOwnProperty('url')?event.url:'',
                    price: event.hasOwnProperty('priceRanges')?event.priceRanges[0].min:'Not Avaiable',
                    priceCurrency: event.hasOwnProperty('priceRanges')?event.priceRanges[0].currency:''
                });
            });

            this.setState({loading:false});

        });
    }
        
    // For each favourite artist call get Event
    async artistsLoop(){

        this.setState({events:[]});

        if(this.state.alertMessage===false){
            this.setState({loading:true});
        }

        if(this.state.favouriteArtists!==undefined && this.state.favouriteArtists!==null){
            for(let i=0;i<this.state.favouriteArtists.length;i++){
                this.getEvent(this.state.favouriteArtists[i],i);
                await this.sleep(500);
            }  
        } 


    }
    
    // update events array in the state
    updateEvents(newEvent){
        this.setState({events: [...this.state.events, newEvent]});
    }
    
    // get first event from TicketMaster from artist name
    getEvent(artist,index){
        EventService.getEventByKeyword(artist).then((response)=>{
            if(response.data.page.totalElements>0){
                let event = response.data._embedded.events[0];
                this.updateEvents({
                    name: event.hasOwnProperty('name')?event.name:'',
                    date: event.dates.start.hasOwnProperty('localDate')?event.dates.start.localDate:'',
                    time: event.dates.start.hasOwnProperty('localtime')?event.dates.start.localTime.substring(0,5):'',
                    locationName: event.hasOwnProperty('_embedded')?event._embedded.venues[0].name:'', 
                    locationCountry: event.hasOwnProperty('_embedded')?event._embedded.venues[0].country.name:'',
                    locationCity: event.hasOwnProperty('_embedded')?event._embedded.venues[0].city.name:'',
                    locationAddress: event.hasOwnProperty('_embedded')&&event._embedded.venues[0].hasOwnProperty('address')?event._embedded.venues[0].address.line1:'',
                    img: event.images[0].hasOwnProperty('url')?event.images[0].url:'',
                    url: event.hasOwnProperty('url')?event.url:'',
                    price: event.hasOwnProperty('priceRanges')?event.priceRanges[0].min:'Not Avaiable',
                    priceCurrency: event.hasOwnProperty('priceRanges')?event.priceRanges[0].currency:''
                });
            }

            if(index===this.state.favouriteArtists.length-1){
                this.setState({loading:false});
                if(this.state.events.length>0){
                    this.setState({selectedEvent:this.state.events[0]});
                }
            }

        });   
    }

    calcStyleButton(selected) {
        if(selected===1) {
            if(this.state.isArtists) {
                return ({display: "inline-block", borderBottom: " 2px solid black"})
            }
            else return {}
        }
        else{
            if(!this.state.isArtists) {
                return ({display: "inline-block", borderBottom: " 2px solid black"})
            }
            else return {}
        }
    }
    
    renderLoadingSpinner(){
        if(this.state.alertMessage===false){
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }
    }

    render() {

        const Aux = props => props.children;

        return (
            <Aux>
                <Col md={7} className={"col-home"}>
                    <Row>
                        <Col className={"title-home"}>
                            Home
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <Row>
                                <Col md={1}/>
                                <Col md={10} style={{height:"3em", textAlign:"center"}}>
                                    <ButtonToolbar>
                                        <ToggleButtonGroup type="checkbox">
                                            <Button style={this.calcStyleButton(1)} value={1}
                                                    bsPrefix="buttons-home-artist"
                                                    onClick={() => this.changeButton(1)}>Artists</Button>
                                            <Button style={this.calcStyleButton(2)} value={2}
                                                    bsPrefix="buttons-home-country"
                                                    onClick={() => this.changeButton(2)}>Countries</Button>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>

                                </Col>
                                <Col md={1}/>
                            </Row>
                        </Container>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.loading === false ? (
                                    <EventList events={this.state.events} value={this.state.isArtists}
                                               onButtonClick={(event) => this.handleInfo(event)}/>) :
                                this.renderLoadingSpinner()}

                            {this.state.alertMessage ? this.renderAlertMessage() : (null)}
                        </Col>
                    </Row>
                </Col>
                <Col md={4} className={"col-info-home"}>
                    {this.state.selectedEvent !== null ? (<Info showTitle={true}  event={this.state.selectedEvent}></Info>) : (null)}
                </Col>
            </Aux>

        )
    }
}


export default Home;