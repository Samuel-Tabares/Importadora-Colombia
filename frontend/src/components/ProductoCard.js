import React from 'react';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {producto.imagen_url ? (
            <img 
              src={producto.imagen_url} 
              className="img-fluid rounded-start" 
              alt={producto.nombre} 
            />
          ) : (
            <div className="bg-light d-flex justify-content-center align-items-center" 
                 style={{ height: '200px' }}>
              <span className="text-muted">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">
              {producto.descripcion ? 
                (producto.descripcion.length > 100 ? 
                  `${producto.descripcion.substring(0, 100)}...` : 
                  producto.descripcion) : 
                'Sin descripción'}
            </p>
            <Link to={`/producto/${producto.id_producto}`} className="btn btn-primary">
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;