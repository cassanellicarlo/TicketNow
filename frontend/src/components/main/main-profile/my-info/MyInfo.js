import React, { Component } from 'react'
import {Row, Col, Carousel, Button} from 'react-bootstrap'
import profile from '../../../../assets/Asset 2Profile.png';
import piggie from '../../../../assets/Asset 16pork1 Copy.png';
import share from '../../../../assets/share-logo.png';
import './MyInfo.css'

class MyInfo extends Component {

	constructor(props){
		super(props);
		this.state = {
            textArea: null,
            user: JSON.parse(localStorage.getItem('user'))
        };
    }

    copyClipBoard = () => {
        this.textArea.select()
        document.execCommand('copy')
    }

	render() {
        const {index, direction} = this.props.myinfo
        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.props.setContent}
                interval={0}
                style={{textAlign: "center", width:"100%"}}
            >
                <Carousel.Item>
                    <Row style={{height: "100vh"}}>
                        <Col>
                            <Row>
                                <Col className={"title-my-info"}>
                                    {
                                        this.state.user ? this.state.user.username : <div>MyName</div>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        className="image-my-info"
                                        src={profile}
                                        alt="Profile"
                                    />
                                    <Row style={{height: "5vh"}}>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {
                                                this.state.user&&this.state.user.spotify !== 'Y' ? (
                                                    <p>
                                                        <p className={"p-my-info"}>
                                                            <b>{this.state.user.name} {this.state.user.surname}</b></p>
                                                        <p className={"p-my-info"}>{this.state.user.age}</p>
                                                        <p className={"p-my-info"}
                                                           style={{"height": "3em"}}>{this.state.user.work}</p>
                                                    </p>
                                                ) : (null)
                                            }
                                            <p><b>Invite your friends</b></p>
                                            <p className={"p-my-info"}>CODE:<br/></p>
                                            <input className="input-my-info" key="1" type="text"
                                                   value="123456789QWERTYUIOP"
                                                   id="0" ref={(textarea) => this.textArea = textarea}/>
                                            <Row style={{height: "4vh"}}/>
                                            <Button key={0} className="button-my-info" onClick={this.copyClipBoard}>
                                                <img className="logo-my-info" src={share} alt="logo"/>
                                                <p className="p-my-info"
                                                   style={{
                                                       "position": "relative",
                                                       "top": "-0.3em",
                                                       "float": "right"
                                                   }}>Share</p>
                                            </Button>
                                            <Row style={{height: "4vh"}}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row style={{height: "100vh"}}>
                        <Col>
                            <Row>
                                <Col className={"title-my-info"}>
                                    Piggie Bank
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        className="image-my-info"
                                        src={piggie}
                                        alt="piggie"
                                    />
                                    <Row style={{height: "5vh"}}/>
                                    <Row>
                                        <Col>
                                            <p className={"p-my-info"}><b>Giulia Salerno</b></p>
                                            <p className={"p-my-info"}>23 anni</p>
                                            <p style={{"height": "5vh"}}>Graphic Designer</p>
                                            <p className={"p-my-info"}><b>Invite your friends</b></p>
                                            <p className={"p-my-info"}>CODE:<br/></p>
                                            <input className="input-my-info" key="2" type="text"
                                                   value="123456789QWERTYUH"
                                                   id="1"/>
                                            <Row style={{height: "3vh"}}/>
                                            <Button key={1} className="button-my-info" onClick={this.copyClipBoard}>
                                                <img className="logo-my-info" src={share} alt="logo"></img>
                                                <p className="p-my-info"
                                                   style={{"position": "relative", "top": "-0.3em"}}>Share</p>
                                            </Button>
                                            <Row style={{height: "4vh"}}/>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default MyInfo;