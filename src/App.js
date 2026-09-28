import './App.css';
import './portfolio-polish.css';
import './project-layout-qa.css';
import './interaction-qa.css';
import './cinematic-enhancements.css';
import CinematicPortfolio from './Components/CinematicPortfolio';
import HomeExplorerRobot from './Components/HomeExplorerRobot';
import StoryExperienceTimeline from './Components/StoryExperienceTimeline';

function App() {
  return (
    <>
      <CinematicPortfolio />
      <StoryExperienceTimeline />
      <HomeExplorerRobot />
    </>
  );
}

export default App;
