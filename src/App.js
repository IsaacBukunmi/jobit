import {Home, Register, Error, Login} from "./pages";
import { AllJobs, Profile, DashboardLayout, Stats, AddJob, } from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Listings from "./pages/listings";
import ProtectedRoute from "./routes/protected-route";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
              <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} /> 
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-listings" element={<Listings />}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
