import {Home, Register, Error, Login} from "./pages";
import { AllJobs, Profile, DashboardLayout, Stats, AddJob, } from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Listings from "./pages/listings";
import ProtectedRoute from "./routes/protected-route";
import { routes } from "./utils/routes";
import ListingDetails from "./pages/listing-details";


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
          <Route path={routes.ALL_JOBS} element={<AllJobs />} />
          <Route path={routes.ADD_JOB} element={<AddJob />} />
          <Route path={routes.PROFILE} element={<Profile />} /> 
        </Route>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.LISTINGS} element={<Listings />}/>
        <Route path={routes.LiSTING_DETAILS} element={<ListingDetails />}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
