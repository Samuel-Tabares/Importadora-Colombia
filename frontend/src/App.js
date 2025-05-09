import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductoDetailPage from './pages/ProductoDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              <i className="bi bi-box-seam me-2"></i>
              Importa Colombia
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="bi bi-house-door me-1"></i> Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#productos">
                    <i className="bi bi-grid me-1"></i> Productos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#contacto">
                    <i className="bi bi-envelope me-1"></i> Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/producto/:id" element={<ProductoDetailPage />} />
          </Routes>
        </main>
        
        <footer className="text-center py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-md-start">
                <h5 className="mb-3">Importa Colombia</h5>
                <p className="mb-0">Importando calidad y tecnología directamente de China a Colombia.</p>
              </div>
              <div className="col-md-4 my-3 my-md-0">
                <h5 className="mb-3">Enlaces rápidos</h5>
                <ul className="list-unstyled">
                  <li><a href="/" className="text-white-50">Inicio</a></li>
                  <li><a href="/#productos" className="text-white-50">Productos</a></li>
                  <li><a href="/#contacto" className="text-white-50">Contacto</a></li>
                </ul>
              </div>
              <div className="col-md-4 text-md-end">
                <h5 className="mb-3">Síguenos</h5>
                <div>
                  <a href="#!" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
                  <a href="#!" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
                  <a href="#!" className="text-white"><i className="bi bi-twitter fs-4"></i></a>
                </div>
              </div>
            </div>
            <hr className="my-3" style={{backgroundColor: "rgba(255,255,255,0.2)"}} />
            <p className="mb-0">© {new Date().getFullYear()} Importa Colombia. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;