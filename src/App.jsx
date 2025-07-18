import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import LandingPage       from './pages/LandingPage';
import LoginPage         from './pages/LoginPage';
import Cadastro          from './pages/Cadastro';
import Triagem           from './pages/Triagem';
import Atendimento       from './pages/Atendimento';
import Painel            from './pages/Painel';
import ConsultaRemedios  from './components/ConsultaRemedios';
import Header            from './components/Header';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { pathname } = useLocation();

  // esconder header em '/' (landing) e '/login'
  const hideHeader = pathname === '/' || pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* Rota pública: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Autenticação */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas */}
        <Route
          path="/cadastro"
          element={
            <PrivateRoute>
              <Cadastro />
            </PrivateRoute>
          }
        />
        <Route
          path="/triagem"
          element={
            <PrivateRoute>
              <Triagem />
            </PrivateRoute>
          }
        />
        <Route
          path="/atendimento"
          element={
            <PrivateRoute>
              <Atendimento />
            </PrivateRoute>
          }
        />
        <Route
          path="/painel"
          element={
            <PrivateRoute>
              <Painel />
            </PrivateRoute>
          }
        />
        <Route
          path="/consulta"
          element={
            <PrivateRoute>
              <ConsultaRemedios />
            </PrivateRoute>
          }
        />

        {/* Qualquer outra rota leva ao início */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 min-h-screen">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}
