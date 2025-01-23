import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Layout.css';

function Layout() {

    return (
        <>
            <div className='titlebar'>
                <Container style={{ boxShadow: 'rgba(255, 255, 255, 0.35) 0px -50px 20px -50px inset'}} fluid>
                    <Row>
                        <Col xl={1} md={1} sm={1} xs={2} style={{paddingLeft: '0', paddingRight: '0'}}>
                            <img src='./images/Gain_Growth.png' style={{maxWidth: '100%', maxHeight: '100%', height: '-webkit-fill-available'}} alt="Gain Growth"></img>
                        </Col>
                        <Col xl={4} md={4} sm={4} xs={7} className='layoutTitle'>
                            Gain Growth
                        </Col>
                        <Col xl={7} md={7} sm={7} xs={12} className='titlebar-button'>
                            <Link className="button-shadow" to="/">Home</Link>
                            <Link className="button-shadow" to="/fds">Fixed Deposits</Link>
                            <Link className="button-shadow" to="/investments">Investments</Link>
                            <Link className='button-shadow' to="/howtouse">
                                <div className='icon-button'>
                                    <i class="bi bi-journal-bookmark-fill"></i>
                                    <span>
                                        How to Use?
                                    </span>
                                </div>
                            </Link>
                            <Link className='button-shadow' to="/about">
                                <div className='icon-button'>
                                    <i class="bi bi-question-circle-fill"></i>
                                    <span>
                                        About
                                    </span>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;