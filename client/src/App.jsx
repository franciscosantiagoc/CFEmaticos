import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav/Nav';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
