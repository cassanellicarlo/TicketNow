import React, { Component } from 'react';
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import './Login.css';
import spotify from '../../assets/spotify-logo.png';
import background from '../../assets/Desktop_HD.png';
import { authEndpoint, clientId, redirectUri, scopes } from "../../services/spotify-services/config";
import Auth from '../../services/AuthService';
import UserService from '../../services/UserService';
import SpotifyService from '../../services/spotify-services/SpotifyService';

class Login extends Component {

constructor(props) {
    super(props);
    this.state={
        username:'',
        password:'',
        errorMessage: false
    }
}

componentDidMount() {
    if(SpotifyService.setToken()){
        Auth.login(()=>{
        this.props.history.push("/");
    });
  }
}

doLogin(){
    let username = this.state.userId;
    let password = this.state.password;

    Auth.login( () => {
        UserService.loginUser(username,password).then((response)=>{
            localStorage.setItem('user',JSON.stringify(response.data));
            this.props.history.push("/");
        })
        .catch(()=> this.setState({errorMessage:true}));
        
    });
}

handleUserIdChange = (event) => {
    this.setState({userId: event.target.value});
}

handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
}

renderErrorMessage (){
    if(this.state.errorMessage){
        setTimeout(()=>{
            this.setState({errorMessage:false})  
        },3000)
        return (<Alert className='errorMessage-login'><strong>Login Failed</strong></Alert>);
    }
       

}

render() {
    return (
    <div id="root">
        <img className="img-fluid fit-login" src={background} alt="background"></img>
        <div className="main-login">
            <Container>
                <Row>
                    <Col>
                        <h1 className="font-title-login">
                            HELLO WORLD!
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="font-max-login"> Sign in </Col>
                </Row>
                <Row>
                    <Col className="spotify-button-login">
                        <Button className="btn--loginApp-link" 
                        href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`} variant="success" size="lg" style={{"backgroundColor": "#1db954", "borderRadius": "10px"}}>&nbsp; Connect with <b>Spotify</b>
                            <img className="spotify-logo-login" src={spotify} alt="spotify-logo">
                            </img>
                        </Button>
                    </Col>
                </Row>
                <div className="or-login" style={{"color":"white", "textAlign": "center"}}>________&nbsp;<p style={{"display": "inline", "position": "relative", "top": "5px"}}>or</p>&nbsp;________</div>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Text as="input" className="text-line-login" type="email" style={{"textAlign": "center", "position": "relative","left": "20px"}} placeholder="Phone number, E-mail or Username" onChange={this.handleUserIdChange} value={this.state.userId} size="45" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Text as="input" className="text-line-login" type="password" style={{"textAlign": "center", "position": "relative","left": "20px"}} placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} size="45"/>
                            </Form.Group>
                            
                            <Row>
                                <Col className="recover-psw-login"> Lost your password? <a href="/signup" style={{"color": "white"}}><b>Recover</b></a> </Col>
                            </Row>

                            {this.renderErrorMessage()}
                            
                            <Col className="button-login">
                                <Button variant="light" onClick={() => this.doLogin()} style={{"fontFamily": "Libre Franklin, sans-serif", "fontWeight" : "80px", "fontSize": "15px", "color": "black", "backgroundColor": "white", "width": "200px", "borderRadius": "10px"}}>
                                    SIGN IN
                                </Button>
                            </Col>
                        </Form>
                    </Col>
                    <Col>
                        <p style={{"color": "white", "fontSize": "13px", "textAlign": "center", "position": "relative", "top": "30px"}}> Don't you have an account?&nbsp;
                            <a href="/signup" style={{"color": "white"}}><b>Sign up</b></a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    );
  }
}

export default Login;