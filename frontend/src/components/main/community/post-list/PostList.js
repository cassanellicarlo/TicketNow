import React, {Component} from "react";
//import Event from "../../home/event/Event";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Post from "../post/Post";

class PostList extends Component{
    
    render() {
        return(
            <Container>
                <Row>
                    {
                        this.props.posts?this.props.posts.map((post) => (
                        <Post refresh={this.props.refresh} key={post.title} data={post} isFavourite={this.props.isFavourite}/>
                    )):
                    <p>You have no post to view</p>
                    }
                </Row>
            </Container>
        )
    }
}

export default PostList