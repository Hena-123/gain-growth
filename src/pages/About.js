import { Container, Row, Col } from 'react-bootstrap';

import './About.css';

export default function About() {

    return(
        <div className='about'>
            <Container>
                <Row>
                    <Col xl={7} xs={12}>
                        <div className='aboutInfo'>
                            <h1>Gain-Growth: Elevate Your Investment Insights</h1>
                            <p>
                                Welcome to Gain-Growth, your go-to platform for insightful analytics on fixed deposits and investments. Our mission is to empower you with the knowledge you need to make informed financial decisions. With our user-friendly interface, you can easily track and analyze your fixed deposits, monitor interest rates, and explore investment opportunities tailored to your goals.
                            </p>
                            <p>
                                Gain-Growth provides comprehensive tools that allow you to visualize your financial performance, compare options, and optimize your portfolio. Whether you are a seasoned investor or just starting out, our analytics help you maximize returns and minimize risks. Join us today and take control of your financial future with data-driven insights!
                            </p>
                        </div>
                    </Col>
                    <Col xl={5} xs={12}>
                        <img alt="Not Found" src='./images/About_Gain_Growth.jpg' className='img'></img>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}