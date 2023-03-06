import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav/Nav';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
import ListCareCenter from './Pages/CareCenter/CareCenter';
function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/centros/lista" element={<ListCareCenter/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
