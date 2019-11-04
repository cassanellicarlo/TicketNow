import React, {Component} from 'react';
import background from "../../assets/Desktop_HD.png";
import {Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import "./Signup.css";
import Api from "../../services/UserService";

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            username: null,
            phone: null,
            password: null,
            name: null,
            surname: null,
            work: null,
            age: null,
            alertMessage: null
        }
    }

    handleEmailChange = (event) => this.setState({email:event.target.value})
    handleUsernameChange = (event) => this.setState({username:event.target.value})
    handlePhoneChange = (event) => this.setState({phone:event.target.value})
    handlePasswordChange = (event) => this.setState({password:event.target.value})
    handleNameChange = (event) => this.setState({name:event.target.value})
    handleSurnameChange = (event) => this.setState({surname:event.target.value})
    handleWorkChange = (event) => this.setState({work:event.target.value})
    handleAgeChange = (event) => this.setState({age:event.target.value})

    register() {

        console.log("SIGNUP");
        console.log(this.state);

        if(this.checkFields()){
            let user= {
                email: this.state.email,
                username: this.state.username,
                phoneNumber: this.state.phone,
                password: this.state.password,
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age,
                work: this.state.work
            };
    
            Api.addUser((user))
                .then( (response) => {
                    this.setState({alertMessage:'User successfully registered! Redirecting to login...'});
                    setTimeout(()=>{
                        this.props.history.push("/login");
                    },4000);
                    
                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({alertMessage:'Signup error'});
                });
        }



    }

    checkFields (){
        if(this.state.age == null|| this.state.email == null || this.state.name == null
            || this.state.password == null || this.state.phone == null|| this.state.surname == null
            || this.state.username == null || this.state.work == null){
                this.setState({alertMessage:'All input fields are required'});
                return false;
            }
        return true;
    }

    renderErrorMessage (){
        if(this.state.alertMessage!=null){
            setTimeout(()=>{
                this.setState({errorMessage:null});
            },3000);
            return (<Alert variant='danger' className='alertMessage-signup'><strong>{this.state.alertMessage}</strong></Alert>);   
        }
           
    }

    render() {
        return (
            <div id="root">
                <img className="img-fluid fit-signup" src={background} alt="background"></img>
                <div className={"main-signup"}>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className={"font-title-signup"}>
                                    Create your account
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group controlId={"formEmail"} className={"form-email-signup"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="email"
                                                   placeholder="Enter email" onChange={this.handleEmailChange}
                                                   value={this.state.email || ''} size="45"/>
                                        <Form.Text className={"font-min-signup"}>
                                            We never share your information with anyone.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId={"formUsername"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="text"
                                                   placeholder="Enter username" onChange={this.handleUsernameChange}
                                                   value={this.state.username || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formName"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="text"
                                                   placeholder="Enter name" onChange={this.handleNameChange}
                                                   value={this.state.name || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formSurname"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="text"
                                                   placeholder="Enter surname" onChange={this.handleSurnameChange}
                                                   value={this.state.surname || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formWork"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="text"
                                                   placeholder="Enter work" onChange={this.handleWorkChange}
                                                   value={this.state.work || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formAge"}>
                                        <Form.Text style={{"textAlign": "center","width":"88%"}} required as="input" className="text-line-signup" type="number"
                                                   placeholder="Enter age" onChange={this.handleAgeChange}
                                                   value={this.state.age || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formMobile"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="text"
                                                   placeholder="Enter phone number" onChange={this.handlePhoneChange}
                                                   value={this.state.phone || ''} size="45"/>
                                    </Form.Group>
                                    <Form.Group controlId={"formPassword"} className={"form-bottom-signup"}>
                                        <Form.Text style={{"textAlign": "center"}} required as="input" className="text-line-signup" type="password"
                                                   placeholder="Enter password" onChange={this.handlePasswordChange}
                                                   value={this.state.password || ''} size="45"/>
                                    </Form.Group>
                                    {this.renderErrorMessage()}
                                </Form>
                                
                            </Col>
                            <Row>
                                <Col className="button-register">
                                    <Button variant="light" onClick={() => this.register()} style={{"fontFamily": "Libre Franklin, sans-serif", "fontSize": "15px", "color": "black", "backgroundColor": "white", "width": "200px", "borderRadius": "10px", "position": "relative", "left": "80px"}}>
                                        SIGN UP
                                    </Button>
                                    <p className="font-min-signup" style={{"position" : "relative", "top" : "1.8em", "left" : "5.5em"}}>Already have an account?&nbsp;
                                        <a href="/login" style={{"color":"white"}}><b>Sign in</b></a>
                                    </p>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}

export default Signup;