import React, {Component} from "react";
import { Col } from "react-bootstrap";
import './MainProfile.css';
import Profile from "./profile/Profile";
import Credit from "./credit/Credit";
import MyInfo from "./my-info/MyInfo";

class MainProfile extends Component{

    constructor(props){
        super(props)
        this.state={
            showProfile:true,
            myinfo: {
                index: 0,
                direction: null,
            }
        }
        this.setContent=this.setContent.bind(this)
    }

    setContent(selectedIndex, direction){
        this.props.setPiggie()
        this.setState({
            showProfile: !this.state.showProfile,
            myinfo:{
                index: selectedIndex,
                direction: direction
            }
        })
    }

    render() {
        const Aux = props => props.children;
        return(
            <Aux>
                <Col md={7} className={"col-main-profile"}>
                    {this.state.showProfile?(<Profile/>): (<Credit/>)}
                </Col>
                <Col md={4} className={"col-main-profile"}>
                    <MyInfo myinfo={this.state.myinfo} setContent={this.setContent}></MyInfo>
                </Col>
            </Aux>
        )
    }
}

export default MainProfile