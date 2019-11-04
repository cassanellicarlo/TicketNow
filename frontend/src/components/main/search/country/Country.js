import React, {Component} from "react";
import { Col, Row, Container } from "react-bootstrap";
import API from '../../../../services/CountryService'
import spaceship from '../../../../assets/space-colony.png';
import spaceship2 from '../../../../assets/space-colony copy.png';
import spaceship3 from '../../../../assets/space-colony copy 2.png';
import spaceship4 from '../../../../assets/space-colony copy 3.png';
import spaceship5 from '../../../../assets/space-colony copy 4.png';
import spaceship6 from '../../../../assets/space-colony copy 5.png';
import spaceship7 from '../../../../assets/space-colony copy 6.png';
import spaceship8 from '../../../../assets/space-colony copy 7.png';
import spaceship9 from '../../../../assets/space-colony copy 8.png';

import './Country.css';

class Country extends Component {

    constructor(props){
        super(props)
        this.state={
            countries:[]
        }
    }

    generateRandomImage(){
        let i;
        switch(i=Math.floor(Math.random() * (9 - 1)) + 1){
            case 1:
                return (
                    <img className="image-country" src={spaceship} alt={i} key={i}></img>
                )
            case 2:
                return (
                    <img className="image-country" src={spaceship2} alt={i} key={i}></img>
                )
            case 3:
                return (
                    <img className="image-country" src={spaceship3} alt={i} key={i}></img>
                )
            case 4:
                return (
                    <img className="image-country" src={spaceship4} alt={i} key={i}></img>
                )
            case 5:
                return (
                    <img className="image-country" src={spaceship5} alt={i} key={i}></img>
                )
            case 6:
                return (
                    <img className="image-country" src={spaceship6} alt={i} key={i}></img>
                )
            case 7:
                return (
                    <img className="image-country" src={spaceship7} alt={i} key={i}></img>
                )
            case 8:
                return (
                    <img className="image-country" src={spaceship8} alt={i} key={i}></img>
                )
            default:
                return(
                    <img className="image-country" src={spaceship9} alt={i} key={i}></img>
                )
        }
    }

    getCountries(){
        API.getAllCountries()
            .then((response) => {          
                this.setState({countries:response.data})
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getCountries()
    }

    render() {
        return(
            <Col>
                <Row>
                    <Col className={"title-country"}>
                        Country
                    </Col>
                </Row>

                <Row>
                    <Container>
                        <div className="font-country" style={{"fontSize": "2em"}}><b>Your favorites</b></div>
                        <Row>                            
                            {
                                this.state.countries!==null&&this.state.countries.length!==0?this.state.countries.map((country)=>(
                                    <Col md={4} style={{"height": "8.2em", "textAlign": "center"}}>
                                        {this.generateRandomImage()}
                                        <p className="font-country">{country.name}</p>
                                    </Col>
                                    )):<Col md={12} style={{"height": "8.2em", "textAlign": "left"}}>
                                            <p className="font-country" style={{"fontSize":"1em"}}>You have no favorite countries</p>
                                        </Col>
                            }
                        </Row>
                    </Container>
                </Row>
            </Col>
        )
    }
}

export default Country;