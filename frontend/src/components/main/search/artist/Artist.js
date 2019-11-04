import React, {Component} from "react";
import { Row, Col, InputGroup, FormControl, Button, Container, Alert, Spinner} from "react-bootstrap";
import './Artist.css';
import searchButton from '../../../../assets/Group_8.png';
import SpotifyService from "../../../../services/spotify-services/SpotifyService";
import artistIcon from '../../../../assets/asset-artist2.png';
import EventList from "../../home/event-list/EventList";
import Info from "../../home/info/Info";
import EventService from "../../../../services/EventService";

class Artist extends Component {

    constructor(props) {
        super(props);
        this.state={
            artistSearch:'',
            artists: [],
            favouriteArtists: SpotifyService.getFavourites()?SpotifyService.getFavourites():[],
            loaded: null,
            showEvents: false,
            showInfo: false,
            events: [],
            selectedEvent: null,
            alertMessage: null
        }
    }

    handleArtistSearchChange = (event) => {
        this.setState({artistSearch: event.target.value});
    }

    resetEvents(){
        this.setState({events:[]});
    }

    resetArtists(){
        this.setState({artist:[]});
    }

    renderMessage(){
        if(this.state.alertMessage!=null){
            setTimeout(()=>{
                this.setState({alertMessage:null});
            },3000);
            return (<Alert size='lg' variant='warning'><strong>{this.state.alertMessage}</strong></Alert>);   
        }          
    }


    searchArtist(){
        this.resetArtists();
        this.resetEvents();
        this.setState({showEvents: false});
        this.setState({showInfo: false});
        SpotifyService.searchArtist(this.state.artistSearch).then((response)=>{
            console.log(response.data.artists.items);
            this.setState({artists:response.data.artists.items});
            this.setState({loading: true});
        });
    }

    getEventsByArtist(artist){
        console.log("Get events of artist: ", artist);
        this.setState({loaded:false});
        this.setState({showEvents: true});
        EventService.getEventByKeyword(artist).then((response)=>{
            if(response.data.page.totalElements>0){
                let events = response.data._embedded.events;
                console.log(events);
                events.forEach((event)=>{
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
                });

                this.setState({loaded:true});
            }
            else{
                this.setState({loaded:true});
                this.setState({alertMessage: "There are no events for this artist"})
            }
        });
    }

    // When info button is clicked, set the selectedEvent
    handleInfo(event){
        this.setState({showInfo: true});
        this.setState({showEvents: false});
        this.setState({selectedEvent:event});
    }
        
        
    // update events array in the state
    updateEvents(newEvent){
        this.setState({events: [...this.state.events, newEvent]});
    }

    handleKeyDown(e){
        if (e.key === 'Enter') {
          this.searchArtist();
        }
    }

    render() {
        return(
            <Col>
                <Row>
                    <Col className={"title-artist"}>                 
                        Search    {!this.state.loaded&&this.state.loaded!==null?(<Spinner animation="border" role="status"></Spinner>):(null)}           
                    </Col>
                </Row>

            <Row>
                <InputGroup size="lg" style={{"margin-bottom": "3em"}}  onKeyPress={(e)=>this.handleKeyDown(e)}>
                   <FormControl
                    style={{"border-top-left-radius": "20px","border-bottom-left-radius": "20px","border-right":"1px solid transparent"}}
                    placeholder="Artist or Band"
                    aria-label="Artist or Band"
                    aria-describedby="basic-addon2"
                    onChange={this.handleArtistSearchChange} 
                   />
                   <InputGroup.Append>
                   <Button variant="outline-light"  style={{"border-right": "1px solid #ced4da", "border-top":"1px solid #ced4da", "border-bottom":"1px solid #ced4da","border-bottom-right-radius": "20px","border-top-right-radius": "20px"}} onClick={() => this.searchArtist()}>
                       <img src={searchButton} className="search-image-artist" alt="artist"></img>
                   </Button>
                   </InputGroup.Append>
                </InputGroup>
            </Row>
            <Row>
                <Container>
                    <Row>
                        {
                            this.state.artists!==null&&!this.state.showEvents&&!this.state.showInfo?this.state.artists.map((artist)=>(
                                <Col md={4} style={{"height": "8.2em", "textAlign": "center"}}>
                                   <Button variant="outline-light" style={{"color": "#212529"}}>
                                    {<a onClick={()=>this.getEventsByArtist(artist.name)}><img className="image-country" src={artistIcon}></img></a>}
                                    <p>{artist.name}</p>
                                    </Button>
                                </Col>
                                )):(null)
                        }

                        { this.renderMessage() }
                    </Row>
                    <Row>
                        {this.state.favouriteArtists!==null&&!this.state.showEvents&&!this.state.showInfo?(
                            <Col md={12} style={{"margin-bottom": "3em","margin-top":"3em"}}><strong>Your top artists </strong></Col>
                        ):(null)}
                        {   
                            this.state.favouriteArtists!==null&&!this.state.showEvents&&!this.state.showInfo?this.state.favouriteArtists.map((artist)=>(
                                <Col md={4} style={{"height": "8.2em", "textAlign": "center"}}>
                                   <Button variant="outline-light" style={{"color": "#212529"}}>
                                    {<a onClick={()=>this.getEventsByArtist(artist)}><img className="image-country" src={artistIcon}></img></a>}
                                    <p>{artist}</p>
                                    </Button>
                                </Col>
                                )):(null)
                        }

                    </Row>
                    <Row>
                        <Col>
                            {this.state.showEvents&&!this.state.showInfo? (
                            <EventList events={this.state.events} onButtonClick={(event) => this.handleInfo(event)}/>) : (null)}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className={"col-info-artist"}>
                            {this.state.selectedEvent !== null&&this.state.showInfo? (<Info showTitle={false} event={this.state.selectedEvent}></Info>) : (null)}
                        </Col>
                    </Row>
                </Container>
            </Row>
            </Col>

        )
    }
}

export default Artist;