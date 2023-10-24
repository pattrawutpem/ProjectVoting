import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Vote from "./page/Vote";
import TypeVote from "./page/TypeVote";
import Candidate from "./page/Candidate";
import CandidateDetail from "./page/CandidateDetail";
import Result from "./page/Result";
import Login from "./page/Login";
import './style.css';

function App() {
  return (
    <BrowserRouter basename="/VotingBlockchain">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Vote/:id_v" element={<Vote />} />
          <Route path="/TypeVote" element={<TypeVote />} />
          <Route path="/Candidate/:type" element={<Candidate />} />
          <Route path="/Candidate/:type/:id/CandidateDetail/:t_id" element={<CandidateDetail />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
