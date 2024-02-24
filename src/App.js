import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/routes/home/home.component';
import NavigationBar from './components/routes/navigation/navigation.component';
import SignIn from './components/routes/sign-in/sign-in.component';

const Shop = () => {
  return (
    <h1>I am Shop</h1>
  )
}


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavigationBar/>}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
      
    </Routes>
  );
}

export default App;
