import React, {Component} from "react";
import { Col } from "react-bootstrap";
import Country from './country/Country'
import Artist from './artist/Artist'
import './Search.css';

class Search extends Component {

    render() {
        const Aux = props => props.children;
        return(
            <Aux>
                <Col md={7} className={"col-search"}>
                    <Artist></Artist>
                </Col>
                <Col md={4} className={"col-search"}>
                    <Country></Country>
                </Col>
            </Aux>
        )
    }
}

export default Search;