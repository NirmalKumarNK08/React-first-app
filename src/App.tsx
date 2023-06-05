import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from "./pages/main/main";
import { Login } from './pages/login';
import { CreatePost } from './pages/create-post/createPost';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/posts" element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
