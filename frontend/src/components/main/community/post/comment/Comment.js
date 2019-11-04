import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import profileImg from "../../../../../assets/Asset 3Profile_blue Copy 3.png";
import "./Comment.css"

class Comment extends Component {
    render() {
        return (
            <Col md={12}>
                <div>
                    <Row style={{borderBottom: "solid #adac97 1px"}}>
                        <Col md={2} style={{ height:"5em"}}><img alt="profile" className={"img-comment"} src={profileImg}/></Col>
                        <Col md={10}><p className={"text-comment"}><strong>{this.props.data.username+": "}</strong>{this.props.data.text}</p></Col>
                    </Row>
                </div>
            </Col>

        )
    }
}

export default Comment