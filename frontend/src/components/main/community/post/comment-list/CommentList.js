import React, {Component} from "react"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Comment from "../comment/Comment";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import PostService from "../../../../../services/PostService";

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state={
            commentText: ''
        }
    }

    sendComment(){
        let postId=this.props.postId;
        let userId=JSON.parse(localStorage.getItem('user')).id;
        let text=this.state.commentText;
        PostService.addComment(postId,text,userId);
        this.props.refresh();
    }


    handleCommentTextChange = (event) => {
        this.setState({commentText: event.target.value});
    }

    render() {
        return(
            <Container>
                <Row>
                    {this.props.comments.map((comment) => (
                        <Comment key={Math.random()} data={comment}/>
                    ))}
                </Row>
                <Row style={{height:"0.6em"}}/>
                <Row>
                    <Col>
                        <div>
                        <InputGroup>
                            <FormControl
                                placeholder="Write your comment"
                                aria-label="Write your comment"
                                aria-describedby="basic-addon2"
                                onChange={this.handleCommentTextChange}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={()=>this.sendComment()}>Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CommentList