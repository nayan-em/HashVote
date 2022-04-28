import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login.js'
import Register from './components/Register'
import Home from './components/Home'
import Poll from './components/Poll'
import Transactions from "./components/Transactions.js";
import VoteCount from "./components/VoteCount.js";
import Blockchain from "./components/Blockchain.js";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/home/:id' element={<Home />} />
          <Route exact path='/poll/:id/:pollId' element={<Poll />} />
          <Route exact path='/viewTrans' element={<Transactions />} />
          <Route exact path='/countVotes' element={<VoteCount />} />
          <Route exact path='/viewBlockchain' element={<Blockchain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
