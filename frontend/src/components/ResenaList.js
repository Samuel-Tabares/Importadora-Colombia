import React from 'react';

const ResenaList = ({ resenas }) => {
  if (!resenas || resenas.length === 0) {
    return (
      <div className="card mb-4">
        <div className="card-body text-center">
          <p className="text-muted mb-0">No hay reseñas disponibles para este producto.</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Reseñas ({resenas.length})</h5>
      </div>
      <div className="card-body">
        {resenas.map((resena) => (
          <div key={resena.id_resena} className="border-bottom mb-3 pb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>{resena.id_usuario.nombre}</strong> <span className="text-muted">({resena.ciudad})</span>
              </div>
              <div>
                {renderStars(resena.calificacion)}
              </div>
            </div>
            <p className="mb-1">{resena.comentario}</p>
            <small className="text-muted">
              {new Date(resena.fecha_resena).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResenaList;