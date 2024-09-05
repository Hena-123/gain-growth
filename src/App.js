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
          <div style={{padding: '60px'}}>
            <Container>
              <Row>
                <Col xl={8}>
                  <h1 style={{color: 'white', height: '100px'}}>
                    Track your wonderful betterment<br></br>using Gain Growth
                  </h1>
                </Col>
                <Col xl={4}>
                  <div className='footer-contact'>
                    <ul style={{color: 'white', fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '1.25rem', lineHeight: '1.75rem'}}>
                      <li>
                        <i class="bi bi-telephone-fill" ></i>
                        <span style={{marginLeft: '1.15rem'}}>Contact</span>
                      </li>
                      <li>
                        <i class="bi bi-envelope-at-fill"></i>
                        <span style={{marginLeft: '1.15rem'}}>user@gmail.com</span>
                      </li>
                      <li>
                        <i class="bi bi-geo-alt-fill"></i>
                        <span style={{marginLeft: '1.15rem'}}>Ahmedabad, Gujarat.</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
            <hr style={{color: 'white', backgroundColor: 'white', height: 1, borderColor : 'white', margin: '20px 0px', opacity: 0.7  }}/>
            <Link class="button" role="button" to="/about">
              <span class="text">About</span>
            </Link>
            <Link class="button" role="button" to="/supports">
              <span class="text">Supports</span>
            </Link>
          </div>
        </footer>
      </BrowserRouter>
    </CookiesProvider>
  );
}


export default App;