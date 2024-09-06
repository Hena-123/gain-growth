import './Layout.css';

import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalImage from "react-modal-image";
import InputModal from '../components/InputModal';

function Layout() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            { isModalOpen &&
                    <InputModal isModalOpen="true"></InputModal>
            }
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <Container style={{ boxShadow: 'rgba(255, 255, 255, 0.35) 0px -50px 20px -50px inset'}} fluid>
                    <Row>
                        <Col xl={1} style={{paddingLeft: '0', paddingRight: '0'}}>
                            <ModalImage small={'/Gain_Growth.png'} large={'/Gain_Growth.png'} alt="Gain Growth"/>
                        </Col>
                        <Col xl={5} className='layoutTitle'>
                            Gain Growth
                        </Col>
                        <Col xl={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Link className="button-shadow" to="/">Home</Link>
                            <Link className="button-shadow" to="/fds">Fixed Deposits</Link>
                            <Link className="button-shadow" to="/investments">Investments</Link>
                            <Link className='update-sheet' onClick={() => setIsModalOpen(true)}>
                                <i class="bi bi-pencil-fill" style={{ marginRight: '10px'}}></i>
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