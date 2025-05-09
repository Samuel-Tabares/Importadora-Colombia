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
      <div className="container mt-5">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando información del producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger p-4 shadow-sm" role="alert">
          <h4 className="alert-heading">¡Ups! Algo salió mal</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Intenta recargar la página o vuelve más tarde.</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning p-4 shadow-sm" role="alert">
          <h4 className="alert-heading">Producto no encontrado</h4>
          <p>Lo sentimos, no pudimos encontrar el producto que estás buscando.</p>
          <hr />
          <p className="mb-0">Vuelve a la página principal para ver otros productos disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="product-detail">
        <div className="row g-0">
          <div className="col-md-5">
            {producto.imagen_url ? (
              <div className="img-container">
                <img 
                  src={producto.imagen_url} 
                  className="img-fluid" 
                  alt={producto.nombre} 
                />
              </div>
            ) : (
              <div 
                className="bg-light d-flex justify-content-center align-items-center" 
                style={{ height: "400px" }}
              >
                <span className="text-muted">Sin imagen disponible</span>
              </div>
            )}
          </div>
          <div className="col-md-7">
            <div className="card-body p-4">
              <h2 className="mb-3">{producto.nombre}</h2>
              <p className="description">{producto.descripcion}</p>
              
              {producto.fecha_importacion && (
                <p className="meta-info">
                  <i className="bi bi-calendar-check me-2"></i>
                  Fecha de importación: {new Date(producto.fecha_importacion).toLocaleDateString()}
                </p>
              )}
              
              {producto.ficha_tecnica && (
                <div className="tech-specs">
                  <h3><i className="bi bi-file-earmark-text me-2"></i>Ficha Técnica</h3>
                  <p className="mb-0" style={{whiteSpace: 'pre-line'}}>{producto.ficha_tecnica}</p>
                </div>
              )}
              
              <div className="mt-4">
                <LikeDislikeButtons productoId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="review-form">
            <h3><i className="bi bi-pencil-square me-2"></i>Escribe tu reseña</h3>
            <ResenaForm productoId={id} onResenaSubmitted={handleResenaSubmitted} />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="review-list">
            <h3 className="mb-4"><i className="bi bi-chat-quote me-2"></i>Reseñas de usuarios</h3>
            <ResenaList resenas={resenas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetailPage;