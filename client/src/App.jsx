import './App.css';
import {Route, Routes} from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;
import {UserContextProvider} from "./UserContext";

function App() {
  return (
    <UserContextProvider>
    <Routes>
        <Route path="/" element={<Layout />}> 
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App

//Dan - left off at 1:48:00
