import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Fds from './pages/Fds';
import Investments from './pages/Investments';
import Home from './pages/Home';
import Layout from './pages/Layout';
import About from './pages/About';
import Supports from './pages/Supports';
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/fds" element={<Fds />}></Route>
          <Route path="/investments" element={<Investments />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/supports" element={<Supports />}></Route>
          </Route>
        </Routes>
        <hr style={{color: 'white', backgroundColor: 'white', height: 1, borderColor : 'white', margin: '20px 0px 0px 0px', opacity: 0.4}}/>
        <footer className='footer'>
          <div className='footer-div'>
            <Container className='footer-container'>
              <Row>
                <Col xl={8} md={8} sm={8} xs={8}>
                  <h1 className='footer-title'>
                    Track your wonderful betterment<br></br>using Gain Growth
                  </h1>
                </Col>
                <Col xl={4} md={4} sm={4} xs={4}>
                  <div className='footer-contact'>
                    <ul className='footer-ul'>
                      <li>
                        <i class="bi bi-telephone-fill"></i>
                        <span>Contact</span>
                      </li>
                      <li>
                        <i class="bi bi-envelope-at-fill"></i>
                        <span>user@gmail.com</span>
                      </li>
                      <li>
                        <i class="bi bi-geo-alt-fill"></i>
                        <span>Ahmedabad, Gujarat.</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row style={{marginTop: '0px', marginBottom: '0px'}}>
                <hr className='linebreak'/>
              </Row>
              <Row>
                <Col xl={1} md={1} sm={1} xs={1}>
                  <Link class="button" role="button" to="/about">
                    <span class="text">About</span>
                  </Link>
                </Col>
                <Col xl={1} md={1} sm={1} xs={1}>
                  <Link class="button" role="button" to="/supports">
                    <span class="text">Supports</span>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        </footer>
      </BrowserRouter>
    </CookiesProvider>
  );
}


export default App;