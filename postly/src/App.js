import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Authentication from "./auth/Authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={true?<HomePage/>:<Authentication/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
