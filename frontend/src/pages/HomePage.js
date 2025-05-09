import React, { useState, useEffect } from 'react';
import ProductoCard from '../components/ProductoCard';
import { fetchProductos } from '../services/api';

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductos = async () => {
      try {
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

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Nuestros Productos Importados</h1>
      <p className="lead mb-4">
        Explora nuestra colección de productos importados y déjanos tu opinión.
      </p>

      {productos.length === 0 ? (
        <div className="alert alert-info">
          No hay productos disponibles en este momento.
        </div>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.id_producto} className="col-md-12 mb-4">
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;