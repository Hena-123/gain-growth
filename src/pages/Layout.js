import './Layout.css';

import { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import DataHandler from '../components/DataHandler';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';
import {updateFDs, updateInvestments, cleanUpAll} from '../app/redux/actions';
import { useCookies } from "react-cookie";

function Layout() {

    const [cookies, setCookie] = useCookies(['spreadSheetId']);
    const navigate = useNavigate();
    const location = useLocation();

    const [invalidSheet, setInvalidSheet] = useState(false);

    useEffect(() => {
        // console.log("navigated from layout");
        // setInvalidSheet(location.state?.invalidsheet !== undefined ? location.state?.invalidsheet : false);
        // console.log("invalid sheet", invalidSheet);
        // console.log("location", location);
    }, [])

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
                        </Col>
                    </Row>
                </Container>
                <Outlet />
            </div>
            {/* {
                invalidSheet ?
                    <div style={{textAlign: 'center'}}>
                        <div className="welcomeTitle" >
                            Welcome to Gain Growth
                        </div>
                        <img className="invalidSheet" onClick={() => navigate('/howtouse')} src="/Invalid_Sheet.png" alt="Gain Growth"></img>
                    </div>
                :
                <Outlet />
            } */}
        </>
    );
}

export default Layout;