import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductos } from '../services/api';

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  useEffect(() => {
    const getProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching productos:', error);
        setError('Error al cargar los productos. Por favor, recarga la página.');
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  const obtenerCategorias = () => {
    if (!productos || productos.length === 0) return ['Todos'];
    
    const categorias = productos
      .map(p => p.id_categoria?.nombre || 'Sin categoría')
      .filter((c, i, self) => self.indexOf(c) === i);
    
    return ['Todos', ...categorias];
  };

  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter(p => p.id_categoria?.nombre === categoriaSeleccionada);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger p-4 shadow-sm" role="alert">
          <h4 className="alert-heading">¡Ups! Algo salió mal</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Intenta recargar la página o vuelve más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Nuestros Productos Importados</h1>
          <p>Explora nuestra colección de productos importados de China y déjanos tu opinión.</p>
        </div>
      </div>
    
      <div className="container">
        {obtenerCategorias().length > 1 && (
          <div className="category-filter mb-4">
            <div className="d-flex flex-wrap">
              {obtenerCategorias().map(categoria => (
                <button
                  key={categoria}
                  className={`btn ${categoriaSeleccionada === categoria ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                  onClick={() => setCategoriaSeleccionada(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        )}

        {productosFiltrados.length === 0 ? (
          <div className="alert alert-info">
            No hay productos disponibles en este momento.
          </div>
        ) : (
          <div className="row">
            {productosFiltrados.map((producto) => (
              <div key={producto.id_producto} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="img-container">
                    {producto.imagen_url ? (
                      <img 
                        src={producto.imagen_url} 
                        className="img-fluid" 
                        alt={producto.nombre}
                      />
                    ) : (
                      <div className="bg-light d-flex justify-content-center align-items-center" 
                           style={{ height: "200px" }}>
                        <span className="text-muted">Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">
                      {producto.descripcion ? 
                        (producto.descripcion.length > 120 ? 
                          `${producto.descripcion.substring(0, 120)}...` : 
                          producto.descripcion) : 
                        'Sin descripción'}
                    </p>
                    <Link to={`/producto/${producto.id_producto}`} className="btn btn-primary mt-auto">
                      <i className="bi bi-eye me-2"></i>Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;