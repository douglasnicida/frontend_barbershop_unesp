import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BarbershopDetails from "./pages/barbershop_details/BarbershopDetails";
import UserAppointmentList from "./pages/user_appointment_list/UserAppointmentList";
import BarberAppointmentList from "./pages/barbershop_appointment_list/BarberAppointmentList";
import UserBarbershopList from "./pages/user_barbershop_list/UserBarbershopList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/not_found/NotFound";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/barbearia/:id" element={<BarbershopDetails />} />
          <Route path="/meus_agendamentos" element={<UserAppointmentList />} />
          <Route path="/minhas_barbearias" element={<UserBarbershopList />} />
          <Route path="/minhas_barbearias/barbearia" element={<BarberAppointmentList />} />
          
          {/* Rota de fallback para 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  };
  
  export default AppRouter;