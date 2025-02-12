import { useRef } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Layout.css';

function Layout() {

    const sectionRef = useRef(null);
    const navigate = useNavigate();

    const copiedToClipboard = (query) => {
        var copiedToClipboard = document.querySelector(query);
        if(copiedToClipboard.style.visibility == 'hidden') {
            copiedToClipboard.style.visibility = 'visible';
            copiedToClipboard.style.opacity = '1';
            setTimeout(() => {
                copiedToClipboard.style.visibility = 'hidden';
                copiedToClipboard.style.opacity = '0';
            }, 1500);
        }
    }

    const handleLinkClick = (e, nav) => {
        e.preventDefault(); // Prevent default behavior of the Link (i.e., navigation)

        navigate(nav);
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    };

    return (
        <>
            <div className='layout' id='layout'>
                <Container className='titlebar' fluid>
                    <Row className='titlebar-row'>
                        <Col xl={1} md={1} sm={1} xs={2} style={{paddingLeft: '0', paddingRight: '0'}}>
                            <img src='./images/Gain_Growth.png' style={{maxWidth: '100%', maxHeight: '100%', height: '-webkit-fill-available'}} alt="Gain Growth"></img>
                        </Col>
                        <Col xl={4} md={4} sm={4} xs={7} className='layoutTitle'>
                            Gain Growth
                        </Col>
                        <Col xl={7} md={7} sm={7} xs={12} className='titlebar-button'>
                            <Link className="button-shadow" to="/"
                                onClick={(e) => handleLinkClick(e, "/")}>Home</Link>
                            <Link className="button-shadow" to="/fds"
                                onClick={(e) => handleLinkClick(e, "/fds")}>Fixed Deposits</Link>
                            <Link className="button-shadow" to="/investments"
                                onClick={(e) => handleLinkClick(e, "/investments")}>Investments</Link>
                            <Link className='button-shadow' to="/howtouse"
                                onClick={(e) => handleLinkClick(e, "/howtouse")}>
                                <div className='ctooltip'>
                                    <i class="bi bi-journal-bookmark-fill"></i>
                                    <span className='ctooltiptext bottom-ctooltiptext'>
                                        How to Use?
                                    </span>
                                </div>
                            </Link>
                            <Link className='button-shadow' to="/about"
                                onClick={(e) => handleLinkClick(e, "/about")}>
                                <div className='ctooltip'>
                                    <i class="bi bi-question-circle-fill"></i>
                                    <span className='ctooltiptext bottom-ctooltiptext'>
                                        About
                                    </span>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                <div className='body'>
                    <div className='main-content' ref={sectionRef}>
                        <Outlet/>
                    </div>
                    <hr style={{color: 'white', backgroundColor: 'white', height: 1, borderColor : 'white', margin: '20px 0px 0px 0px', opacity: 0.4}}/>
                    <footer className='footer'>
                        <div className='footer-div'>
                            <Container className='footer-container'>
                                <Row>
                                    <Col xl={8} md={8} sm={8} xs={12}>
                                        <h1 className='footer-title'>
                                            Track your wonderful betterment<br></br>using Gain Growth
                                        </h1>
                                    </Col>
                                    <Col xl={4} md={4} sm={4} xs={12}>
                                        <div className='footer-contact'>
                                            <ul className='footer-ul'>
                                                <li>
                                                    <i className="bi bi-telephone-fill"
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(document.getElementById('phone').innerText);
                                                            copiedToClipboard('.footer-ul li:nth-child(1) #copiedToClipboard');
                                                        }}>
                                                    </i>
                                                    <span id='copiedToClipboard' style={{visibility: 'hidden', opacity: '0'}}>Copied!</span>
                                                    <span id='phone'>7046433816</span>
                                                </li>
                                                <li>
                                                    <i className="bi bi-envelope-at-fill"
                                                        style={{cursor: 'pointer'}}
                                                        onClick={(e) => {
                                                            navigator.clipboard.writeText(document.getElementById('mail').innerText);
                                                            copiedToClipboard('.footer-ul li:nth-child(2) #copiedToClipboard');
                                                        }}>
                                                    </i>
                                                    <span id='copiedToClipboard' style={{visibility: 'hidden', opacity: '0'}}>Copied!</span>
                                                    <span id='mail'>henapatel2000@gmail.com</span>
                                                </li>
                                                <li>
                                                    <i className="bi bi-geo-alt-fill"
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(document.getElementById('location').innerText);
                                                            copiedToClipboard('.footer-ul li:nth-child(3) #copiedToClipboard');
                                                        }}>
                                                    </i>
                                                    <span id='copiedToClipboard' style={{visibility: 'hidden', opacity: '0'}}>Copied!</span>
                                                    <span id='location'>Valsad, Gujarat.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '0px', marginBottom: '0px'}}>
                                    <hr className='linebreak'/>
                                </Row>
                                <Row>
                                    <Col xl={2} md={3} sm={3} xs={5}>
                                        <Link className="footer-button" role="button" to="/howtouse"
                                            onClick={(e) => handleLinkClick(e, "/howtouse")}>
                                            <span className="text">How to use?</span>
                                        </Link>
                                    </Col>
                                    <Col xl={2} md={3} sm={3} xs={5}>
                                        <Link className="footer-button" role="button" to="/about"
                                            onClick={(e) => handleLinkClick(e, "/about")}>
                                            <span className="text">About</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Layout;