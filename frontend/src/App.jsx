import Landing from "./components/Landing"
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Summary from "./components/Summary";
import Influencers from "./components/Influencers";
import AddIdea from "./components/AddIdea";
import NewPrompt from "./components/NewPrompt";
import Strategy from "./components/Strategy";
import ProfilePage from "./components/ProfilePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="add-idea" element={<AddIdea/>} />
          <Route path="new-prompt" element={<NewPrompt/>} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="summary" element={<Summary />} />
          <Route path="strategy" element={<Strategy/>} />
          <Route path="profile" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </Router>

    // <Landing/>
  )
}

export default App
