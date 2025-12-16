import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

function App({ toggleTheme, mode }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/analyze" element={<Analyze toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/result" element={<Result toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/dashboard" element={<Dashboard toggleTheme={toggleTheme} mode={mode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
