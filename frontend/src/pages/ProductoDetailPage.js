import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductoById, fetchResenasByProducto } from '../services/api';
import ResenaForm from '../components/ResenaForm';
import ResenaList from '../components/ResenaList';
import LikeDislikeButtons from '../components/LikeDislikeButtons';

const ProductoDetailPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productoData = await fetchProductoById(id);
      setProducto(productoData);
      
      const resenasData = await fetchResenasByProducto(id);
      setResenas(resenasData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos del producto. Por favor, recarga la página.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleResenaSubmitted = () => {
    // Recargar las reseñas después de enviar una nueva
    fetchResenasByProducto(id).then(data => {
      setResenas(data);
    }).catch(error => {
      console.error('Error refreshing reviews:', error);
    });
  };

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

  if (!producto) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-4">
            {producto.imagen_url ? (
              <img 
                src={producto.imagen_url} 
                className="img-fluid rounded-start" 
                alt={producto.nombre} 
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="bg-light d-flex justify-content-center align-items-center" 
                style={{ height: '400px' }}
              >
                <span className="text-muted">Sin imagen</span>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{producto.nombre}</h2>
              <p className="card-text">{producto.descripcion}</p>
              
              {producto.fecha_importacion && (
                <p className="card-text">
                  <small className="text-muted">
                    Fecha de importación: {new Date(producto.fecha_importacion).toLocaleDateString()}
                  </small>
                </p>
              )}
              
              {producto.ficha_tecnica && (
                <div className="mt-3">
                  <h5>Ficha Técnica</h5>
                  <p className="card-text">{producto.ficha_tecnica}</p>
                </div>
              )}
              
              <LikeDislikeButtons productoId={id} />
            </div>
          </div>
        </div>
      </div>

      <ResenaForm productoId={id} onResenaSubmitted={handleResenaSubmitted} />
      
      <ResenaList resenas={resenas} />
    </div>
  );
};

export default ProductoDetailPage;