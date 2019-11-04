import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./Post.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import profileImg from "../../../../assets/Asset 3Profile_blue Copy 3.png";
import like from "../../../../assets/like.png"
import unlike from "../../../../assets/unlike.png"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CommentList from "./comment-list/CommentList";
import API from "../../../../services/PostService";

class Post extends Component {

    constructor(props) {
        super(props)
        this.state={
            liked:false,
/*             comments:[{
                user:"Marco Marchi",
                text: "ciao mi scrivi in pvt"
            },
                {
                    user: "Nome Cognome",
                    text: "sono interessato"
                },
                {
                    user: "Paolo brosio",
                    text: "ciao"
                }] */

        }

    }

    changeStyle() {        
        if(this.props.data.id&&JSON.parse(localStorage.getItem('user')).id)
            API.likePost(this.props.data.id, JSON.parse(localStorage.getItem('user')).id);

        this.props.refresh();
        
        this.setState({liked:!this.state.liked});

       
    }
    
    sendMail() {
        if(JSON.parse(localStorage.getItem('user')))
            window.location.href="mailto:"+JSON.parse(localStorage.getItem('user')).email+"?subject=ticketnow"
        else
            window.location.href="mailto:example@gmail.com?subject=ticketnow"
    }

    getStyle() {
        if(this.state.liked)
            return(
                {
                    backgroundImage: `url(${like})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }
            )
        else return (
            {
                backgroundImage: `url(${unlike})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }
        )
    }

    renderButtons() {
        if (!this.props.isFavourite)
            return (
                <ListGroupItem>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Button style={this.getStyle()} bsPrefix={"button-post"}
                                        variant={"link"} onClick={() => this.changeStyle()}/>
                            </Col>
                            <Col md={4}>
                                <OverlayTrigger trigger="click"
                                                placement={"bottom"}
                                                rootClose
                                                overlay={
                                                    <Popover style={{
                                                        maxWidth: "30vw",
                                                        maxHeight: "50vh",
                                                        overflowY: "scroll"
                                                    }}>

                                                        <Popover.Content>
                                                            <CommentList refresh={this.props.refresh} postId={this.props.data.id} comments={this.props.data.comments}/>
                                                        </Popover.Content>
                                                    </Popover>
                                                }>
                                    <Button bsPrefix={"button-post commentbutton-post"}
                                            variant={"link"}/>
                                </OverlayTrigger>
                            </Col>
                            <Col md={4}>
                                <Button bsPrefix={"button-post messagebutton-post"} variant={"link"} onClick={this.sendMail}/>
                            </Col>
                        </Row>
                    </Container>
                </ListGroupItem>
            )
    }

    styleHeight() {
        if(!this.props.isFavourite) {
            return {
                height:"14em"
            }
        }
        else
            return {
                height: "9em"
            }
    }

    styleHeightDiv() {
        if(!this.props.isFavourite) {
            return {
                height:"16em"
            }
        }
        else
            return {
                height: "10.5em"
            }
    }

    renderText(text) {
        if (!this.props.isFavourite)
            return <Card.Text className={"text-post"}>
                {text}
            </Card.Text>
    }

    render() {
        const post = this.props.data

        return (
            <Col md={12}>
                <div style={this.styleHeightDiv()}>
                    <Card style={this.styleHeight()} className="post">
                        <Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Card.Img style={{width: "2.3em", paddingBottom: "0.5em"}} className="img-post"
                                              src={profileImg}/>
                                    <Card.Text className={"name-post"}> {post.owner} </Card.Text>

                                    <Card.Title className={"title-post"}>

                                        {post.title + " - " + post.price}

                                    </Card.Title>
                                    {this.renderText(post.text)}
                                </ListGroupItem>

                                {this.renderButtons()}

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        )
    }
}

export default Post