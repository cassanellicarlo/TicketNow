import React, {Component} from "react";
import './Community.css';
import {Row, Col,Form} from "react-bootstrap";
import PostList from "./post-list/PostList";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PostService from "../../../services/PostService"
import UserService from "../../../services/UserService";

class Community extends Component {

    constructor(props) {
        super(props)
        this.state = {
            /*             posts: [{
                            title: "Post title " + 0,
                            price: 0 + "€",
                            text: "this is the text for post " + 0
                        },
                            {
                                title: "Post title " + 1,
                                price: 1 + "€",
                                text: "this is the text for post " + 1
                            },
                            {
                                title: "Post title " + 2,
                                price: 2 + "€",
                                text: "this is the text for post " + 2
                            },
                            {
                                title: "Post title " + 3,
                                price: 3 + "€",
                                text: "this is the text for post " + 3
                            }], */
            posts: [],
            showModal: false,
            canText: false,
            newTitle: '',
            newDescription: '',
            newPrice: '',/*
            favouritePosts: [{
                title: "Post title " + 0,
                price: 0 + "€",
                text: "this is the text for post " + 0,
                comments: []
            },
                {
                    title: "Post title " + 1,
                    price: 1 + "€",
                    text: "this is the text for post " + 1,
                    comments: []
                },
                {
                    title: "Post title " + 2,
                    price: 2 + "€",
                    text: "this is the text for post " + 2,
                    comments: []
                },
                {
                    title: "Post title " + 3,
                    price: 3 + "€",
                    text: "this is the text for post " + 3,
                    comments: []
                }]*/
                favouritePosts:[]
        }
    }

    componentDidMount() {
        this.getPosts();
        this.getFavorites();
    }

    refreshPosts(){
        this.getPosts();
        this.getFavorites();
    }

    getPosts(){
        PostService.getPosts().then((response) => {
            this.setState({
                posts: response.data.sort(this.compare)});
        });
    }
    getFavorites(){
        UserService.getFauvoritesPosts(JSON.parse(localStorage.getItem('user')).id).then((response)=>{
            this.setState({
                favouritePosts: response.data    
            })
        })
    }

    // sort posts desc 
    compare( a, b ) {
        if ( a.id < b.id ){
          return 1;
        }
        if ( a.id > b.id ){
          return -11;
        }
        return 0;
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
        this.setState({canText: !this.state.canText})
    }

    renderModal() {
        if (this.state.showModal) {
            return (
                <Modal.Dialog>
                    <Modal.Header className="modal-header-community">
                        <Modal.Title>Write your post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Text as="input" className="modal-title-community" type="title"
                                           style={{"textAlign": "left", "position": "relative", "left": "2px"}}
                                           placeholder="Title" onChange={this.handleTitleChange}
                                           value={this.state.newTitle} size="45"/>
                            </Form.Group>
                            <Row className="rowspace-community"/>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Text as="textarea" rows="5" className="modal-text-community" type="description"
                                           style={{"textAlign": "left", "position": "relative", "left": "2px"}}
                                           placeholder="Description" onChange={this.handleDescriptionChange}
                                           value={this.state.newDescription} size="45"/>
                            </Form.Group>
                            <Row className="rowspace-community"/>
                            <Form.Group controlId="formBasicPrice">
                                <Form.Text as="input" className="modal-price-community" type="price"
                                           style={{"textAlign": "left", "position": "relative", "left": "2px"}}
                                           placeholder="Price" onChange={this.handlePriceChange}
                                           value={this.state.newPrice} size="45"/>
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.cancelPost()}>Cancel</Button>
                        <Button variant="primary" onClick={() => this.publishPost()}>Publish</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            )
        }
    }

    publishPost() {
        let newTitle = this.state.newTitle;
        let newDescription = this.state.newDescription;
        let newPrice = this.state.newPrice;
        let user = JSON.parse(localStorage.getItem('user'));
        let userId = user.id;
        let owner = user.username;
        this.toggleModal();
        PostService.addPost(newTitle, newDescription, parseInt(newPrice), userId, owner).then((response) => {
            this.getPosts();
        });
        this.setState({newTitle: ''});
        this.setState({newDescription: ''});
        this.setState({newPrice: ''});
    }

    cancelPost() {
        this.toggleModal();
        this.setState({newTitle: ''});
        this.setState({newDescription: ''});
        this.setState({newPrice: ''});
    }

    handleTitleChange = (event) => {
        this.setState({newTitle: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({newDescription: event.target.value});
    }

    handlePriceChange = (event) => {
        this.setState({newPrice: event.target.value});
    }


    render() {


        return (
            <Col md={11}>
                <Row>
                    <Col md={8} className={"col-community"}>
                        <Row>
                            <Col className={"title-community"}>
                                Community
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col className="open-write-post-community">
                                            <FormControl
                                                size="lg"
                                                placeholder="What's on your mind?"
                                                aria-label="What's on your mind?"
                                                aria-describedby="basic-addon2"
                                                onClick={() => this.toggleModal()}
                                                disabled={this.state.canText}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>{this.renderModal()}</Row>
                                    <Row className="rowspace2-community"/>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <PostList refresh={()=>this.refreshPosts()} posts={this.state.posts} isFavourite={false}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className={"col-community"}>
                        <Row>
                            <Col className={"title-community"}>
                                Favourites
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <PostList refresh={()=>this.refreshPosts()} posts={this.state.favouritePosts} isFavourite={true}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default Community;