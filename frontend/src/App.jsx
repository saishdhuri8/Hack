import Landing from "./components/Landing"
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Influencers from "./components/Influencers";
import NewPrompt from "./components/Input";
import Strategy from "./components/Strategy";
import CreativePage from "./components/CreativePage";
import Ideas from "./components/Ideas";
import Profile from "./components/ProfilePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="add-idea" element={<Ideas/>} />
          <Route path="new-prompt" element={<NewPrompt/>} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="creative" element={<CreativePage />} />
          <Route path="strategy" element={<Strategy/>} />
          <Route path="profile" element={<Profile/>} />
        </Route>
      </Routes>
    </Router>

    // <Landing/>
  )
}

export default App
