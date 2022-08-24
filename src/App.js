import './App.css';
import Nav from './components/Nav';
import './assets/style.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import GetPackage from './views/GetPackage';
import AddPackage from './views/AddPackage';
import Delivered from './views/Delivered';

function App() {

  return (
    <Router>
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Delivered/:boxNum' element={<Delivered />}></Route>
        <Route path='/GetPackage' element={<GetPackage />}></Route>
        <Route path='/AddPackage' element={<AddPackage />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
