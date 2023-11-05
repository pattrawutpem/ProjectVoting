import './App.css'
import './style.css'
import Dashboard from './pages/Dashboard'
import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import VoterManage from './pages/VoterManage'
import CandidateType from './pages/CandidateType'
import Candidate_Student_club from './pages/Candidate_Student_club'
import Candidate_House_of_Representatives from './pages/Candidate_House_of_Representatives'
import Candidate_Provincial_Council from './pages/Candidate_Provincial_Council'
import Other from './pages/Other'
import Insert_other from './controls/Insert_other'
import Insert_other_Topic from './controls/Insert_other_Topic'
import Other_Topic from './pages/Other_Topic'
import ScoreType from './pages/ScoreType'
import Score_Student_club from './pages/Score_Student_club'
import Score_House_of_Representatives from './pages/Score_House_of_Representatives'
import Personal_House_of_Representatives from './pages/Personal_House_of_Representatives'
import Score_Provincial_Council from './pages/Score_Provincial_Council'
import Score_Other_Topic from './pages/Score_Other_Topic'
import Score_Other from './pages/Score_Other'
import Insert_student_club from './controls/Insert_student_club'
import Insert_House_of_Representatives from './controls/Insert_House_of_Representatives'
import Personal_Student from './pages/Personal_Student'
import Insrt_Provincial_Council from './controls/Insrt_Provincial_Council'
import Personal_Provincial_Council from './pages/Personal_Provincial_Council'
import Edit_other from './controls/Edit_other'
import Insert_voter from './controls/Insert_voter'
import Edit_voter from './controls/Edit_voter'
import Declare from './pages/Declare'
import Insert_declare from './controls/Insert_declare'
import Personal_declare from './pages/Personal_declare'

function App() {
  return (
    <BrowserRouter basename="/lungban">
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/VoterManage" element={<VoterManage />} />
        <Route path="/CandidateType" element={<CandidateType />} />
        <Route path="/Candidate_Student_club" element={<Candidate_Student_club />} />
        <Route path="/Insert_student_club" element={<Insert_student_club />} />
        <Route path="/Candidate_Student_club/:id/Personal_Student" element={<Personal_Student />} />
        <Route path="/Candidate_House_of_Representatives" element={<Candidate_House_of_Representatives />} />
        <Route path="/Candidate_House_of_Representatives/:id/Personal_House_of_Representatives" element={<Personal_House_of_Representatives />} />
        <Route path="/Insert_House_of_Representatives" element={<Insert_House_of_Representatives />} />
        <Route path="/Candidate_Provincial_Council" element={<Candidate_Provincial_Council />} />
        <Route path="/Other" element={<Other />} />
        <Route path="/Other/:id/Other_Topic/:id_/Insert_other/" element={<Insert_other />} />
        <Route path="/Other/:id/Other_Topic/:no/Edit_other" element={<Edit_other />} />
        <Route path="/Insert_other_Topic" element={<Insert_other_Topic />} />
        <Route path="/Other/:id/Other_Topic/" element={<Other_Topic />} />
        <Route path="/ScoreType" element={<ScoreType />} />
        <Route path="/Score_Student_club" element={<Score_Student_club />} />
        <Route path="/Score_House_of_Representatives" element={<Score_House_of_Representatives />} />
        <Route path="/Score_Provincial_Council" element={<Score_Provincial_Council />} />
        <Route path="/Insrt_Provincial_Council" element={<Insrt_Provincial_Council />} />
        <Route path="Candidate_Provincial_Council/:id/Personal_Provincial_Council" element={<Personal_Provincial_Council />} />
        <Route path="/Score_Other_Topic" element={<Score_Other_Topic />} />
        <Route path="/:id/Score_Other" element={<Score_Other />} />
        <Route path="/Insert_voter" element={<Insert_voter />} />
        <Route path="/VoterManage/:id/Edit_voter" element={<Edit_voter />} />
        <Route path="/Declare" element={<Declare />} />
        <Route path="/Insert_declare" element={<Insert_declare />} />
        <Route path="/Declare/:id/Personal_declare" element={<Personal_declare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
