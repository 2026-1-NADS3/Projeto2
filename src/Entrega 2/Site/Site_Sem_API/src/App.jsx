import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layouts/sidebar";
import Header from "./components/layouts/header";
import Dashboard from "./pages/Dashboard/dashboard";
import Equipe from "./pages/Equipe/Equipe";
import Pacientes from "./pages/Pacientes/Paciente";
import Agenda from "./pages/Agenda/Agenda";
import Perfil from "./pages/Perfil/Perfil";
import Login from "./pages/Login/Login";
import { ModalProvider } from "./context/ModalContext";
import ModalNovoPaciente from "./components/modals/ModalNovoPaciente";
import ModalNovaConsulta from "./components/modals/ModalNovaConsulta";
import ModalAdicionarMembro from "./components/modals/ModalAdicionarMembro";
import ModalCriarRelatorio from "./components/modals/ModalCriarRelatorio";
import ModalArquivados from "./components/modals/ModalArquivados";
import ModalDetalhesPaciente from "./components/modals/ModalDetalhesPaciente";

function RotaProtegida() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none">
        <Header />
        <Routes>
          <Route path="/home"      element={<Dashboard />} />
          <Route path="/equipe"    element={<Equipe />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/agenda"    element={<Agenda />} />
          <Route path="/perfil"    element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/"      element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*"     element={<RotaProtegida />} />
      </Routes>
      <ModalNovoPaciente />
      <ModalNovaConsulta />
      <ModalAdicionarMembro />
      <ModalCriarRelatorio />
      <ModalArquivados />
      <ModalDetalhesPaciente />
    </ModalProvider>
  );
}
