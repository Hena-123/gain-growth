import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Fds from './pages/Fds';
import Investments from './pages/Investments';
import Home from './pages/Home';
import Layout from './pages/Layout';
import HowToUse from './pages/HowToUse';
import About from './pages/About';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/fds" element={<Fds />}></Route>
            <Route path="/investments" element={<Investments />}></Route>
            <Route path="/howtouse" element={<HowToUse />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}


export default App;