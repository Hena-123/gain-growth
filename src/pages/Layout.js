import './Layout.css';

import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputModal from '../components/InputModal';

function Layout() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            { isModalOpen &&
                    <InputModal isModalOpen="true"></InputModal>
            }
            <div className='titlebar'>
                <Container style={{ boxShadow: 'rgba(255, 255, 255, 0.35) 0px -50px 20px -50px inset'}} fluid>
                    <Row>
                        <Col xl={1} md={1} sm={1} xs={2} style={{paddingLeft: '0', paddingRight: '0'}}>
                            <img src='/Gain_Growth.png' style={{maxWidth: '100%', maxHeight: '100%', height: '-webkit-fill-available'}}alt="Gain Growth"></img>
                        </Col>
                        <Col xl={4} md={4} sm={4} xs={7} className='layoutTitle'>
                            Gain Growth
                        </Col>
                        <Col xl={7} md={7} sm={7} xs={12} className='titlebar-button'>
                            <Link className="button-shadow" to="/">Home</Link>
                            <Link className="button-shadow" to="/fds">Fixed Deposits</Link>
                            <Link className="button-shadow" to="/investments">Investments</Link>
                            <Link className='update-sheet' onClick={() => setIsModalOpen(true)}>
                                <i class="bi bi-pencil-fill"></i>
                                Sheet-URL
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Outlet />
        </>
    );
}

export default Layout;