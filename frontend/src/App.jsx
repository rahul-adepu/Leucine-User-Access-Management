import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateSoftware from "./pages/CreateSoftware";
import PendingRequests from "./pages/PendingRequests";
import RequestAccess from "./pages/RequestAccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/request-access" element={<RequestAccess />} />
      </Routes>
    </>
  );
}

export default App;
