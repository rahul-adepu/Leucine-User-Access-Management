import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Route, Routes } from "react-router-dom";
import CreateSoftware from "./pages/CreateSoftware";
import PendingRequests from "./pages/PendingRequests";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
      </Routes>
    </>
  );
}

export default App;
