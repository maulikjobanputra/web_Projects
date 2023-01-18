import Navbar from "./Navbar";
import News from "./News";
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {

  const [progress, setProgress] = useState(0)

  return (
  
    <div className="App">
    
      <Router>

        <Navbar />
      
        <Routes>
          <Route exact path="/" element= {<News  setProgress={setProgress} key="general"  category="general"/>} />
        
          <Route exact path="/science" element={ <News  setProgress={setProgress} key="science" category="science" />} />
        
          <Route exact path="/business" element = {<News  setProgress={setProgress} key="business" category="business"/>} />
        
          <Route exact path="/entertainment" element= {<News  setProgress={setProgress} key="entertainment" category="entertainment"/>} />
        
          <Route exact path="/sports" element= {<News  setProgress={setProgress} key="sports" category="sports"/>} />
        
          <Route exact path="/health" element= {<News  setProgress={setProgress} key="health" category="health"/>} />
        
          <Route exact path="/technology" element= {<News  setProgress={setProgress} key="technology" category="technology"/>} />
        
        </Routes>
      </Router>

        <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>

      </div>
  );
}

export default App;
