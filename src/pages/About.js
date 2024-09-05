import './About.css';

import { Container, Row, Col } from 'react-bootstrap';

export default function About() {

    return(
        <div className='about'>
            <Container>
                <Row>
                    <Col xl={7}>
                        About
                    </Col>
                    <Col xl={5} style={{backgroundColor: 'orchid', textAlign: 'center'}}>
                        <div style={{borderRadius: "50%",width: '450px', height: '450px', backgroundColor: 'white'}}>
                            <img src='./investment.jpg' style={{borderRadius: "50%",width: '400px', height: '400px'}}></img>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}