import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Home from "./home/Home"
import Navbar from "./navbar/Navbar";
import MainProfile from "./main-profile/MainProfile";
import Search from "./search/Search";
import Community from "./community/Community";
import NotFound from "../not-found/NotFound";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: null,
            piggie: false
        }
        this.setPiggie=this.setPiggie.bind(this)
    }

    setPiggie(){
        this.setState({
            piggie:!this.state.piggie
        })
    }

    returnComponent() {
        let navBar = <Navbar selected={this.state.page} piggie={this.state.piggie}/>

        switch (this.props.location.pathname) {
            case "/":
                return <Container style={{maxWidth: '100%'}}>
                    <Row>
                        {navBar}
                        <Home/>
                    </Row>
                </Container>
            case "/profile":
                return <Container style={{maxWidth: '100%'}}>
                    <Row>
                        {navBar}
                        <MainProfile setPiggie={this.setPiggie}/>
                    </Row>
                </Container>
            case "/search":
                return <Container style={{maxWidth: '100%'}}>
                    <Row>
                        {navBar}
                        <Search/>
                    </Row>
                </Container>
            case "/community":
                return <Container style={{maxWidth: '100%'}}>
                    <Row>
                        {navBar}
                        <Community/>
                    </Row>
                </Container>
            default: {
                return <NotFound/>
            }
        }
    }

    render() {
        return (
            <div id={"root"}>
                {this.returnComponent()}
            </div>
        )
    }

}

export default Main