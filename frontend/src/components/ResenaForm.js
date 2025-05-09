import React, { useState, useEffect } from 'react';
import { submitResena, getUserIP } from '../services/api';

const ResenaForm = ({ productoId, onResenaSubmitted }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    comentario: '',
    calificacion: 5,
  });
  const [ip, setIp] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      const userIP = await getUserIP();
      setIp(userIP);
    };
    
    fetchIP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const resenaData = {
        ...formData,
        id_producto: productoId,
        ip_usuario: ip,
      };
      
      await submitResena(resenaData);
      setSubmitSuccess(true);
      setFormData({
        nombre: '',
        ciudad: '',
        comentario: '',
        calificacion: 5,
      });
      
      if (onResenaSubmitted) {
        onResenaSubmitted();
      }
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setError('Error al enviar la reseña. Inténtalo de nuevo.');
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Deja tu reseña</h5>
      </div>
      <div className="card-body">
        {submitSuccess && (
          <div className="alert alert-success">
            ¡Tu reseña ha sido enviada con éxito!
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Tu nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="ciudad" className="form-label">Tu ciudad</label>
            <input
              type="text"
              className="form-control"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="calificacion" className="form-label">
              Calificación (1-5 estrellas)
            </label>
            <select
              className="form-select"
              id="calificacion"
              name="calificacion"
              value={formData.calificacion}
              onChange={handleChange}
              required
            >
              <option value="5">⭐⭐⭐⭐⭐ - Excelente</option>
              <option value="4">⭐⭐⭐⭐ - Muy bueno</option>
              <option value="3">⭐⭐⭐ - Bueno</option>
              <option value="2">⭐⭐ - Regular</option>
              <option value="1">⭐ - Malo</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="comentario" className="form-label">Tu comentario</label>
            <textarea
              className="form-control"
              id="comentario"
              name="comentario"
              rows="3"
              value={formData.comentario}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Reseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResenaForm;