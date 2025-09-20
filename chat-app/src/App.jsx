import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Chat from "./components/chat";
import "./index.css";

function App() {
  return (
    <div className="App">
      <h1 className="app-title">
        Chat App - Made by Natnael Berhane. Visit other projects on my portfolio
        page.
        <br />
        <button
          onClick={() =>
            window.open("https://projects-natnael.netlify.app/", "_blank", "noreferrer")
          }
          aria-label="Projects"
          title="Projects"
        >
          📁 Visit Other Projects
        </button>
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
