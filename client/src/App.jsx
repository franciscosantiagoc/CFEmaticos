import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './components/Nav/Nav';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login/Login';
import ListCareCenter from './Pages/CareCenter/CareCenter';
import ListCfematics from './Pages/Cfematics/ListCfematics';
import NotFound from './Pages/NotFound/NotFound';
function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/centros/lista" element={<ListCareCenter/>} />
        <Route path="/cfematicos/lista" element={<ListCfematics/> } />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
