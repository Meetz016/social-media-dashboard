import {SocialMediaDashboard} from "./components/SocialMediaDashBoard";
import { ThemeProvider } from "./components/SocialMediaDashBoard";
const App = () => {
  return (
    <ThemeProvider>
      <SocialMediaDashboard />
    </ThemeProvider>
  );
};

export default App;