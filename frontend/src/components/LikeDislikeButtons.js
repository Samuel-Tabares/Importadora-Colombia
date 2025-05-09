import React, { useState, useEffect } from 'react';
import { fetchLikesByProducto, submitLike, getUserIP } from '../services/api';

const LikeDislikeButtons = ({ productoId }) => {
  const [likes, setLikes] = useState({ likes: 0, dislikes: 0 });
  const [userAction, setUserAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await fetchLikesByProducto(productoId);
        setLikes(data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [productoId]);

  const handleAction = (type) => {
    if (loading) return;
    
    if (type === userAction) {
      // Si hacemos clic en el mismo botón, eliminamos la acción
      setUserAction(null);
      setShowNameInput(false);
    } else {
      setUserAction(type);
      setShowNameInput(true);
    }
  };

  const handleSubmit = async () => {
    if (!userName.trim()) {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const ip = await getUserIP();
      
      await submitLike({
        id_producto: productoId,
        nombre: userName,
        tipo: userAction,
        ip_usuario: ip
      });
      
      // Actualizar conteo de likes/dislikes
      const updatedLikes = await fetchLikesByProducto(productoId);
      setLikes(updatedLikes);
      
      // Ocultar formulario
      setShowNameInput(false);
      
    } catch (error) {
      console.error('Error submitting like/dislike:', error);
      alert('Ocurrió un error al enviar tu voto. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center mb-2">
        <div className="me-4">
          <button 
            className={`btn ${userAction === 'like' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleAction('like')}
            disabled={loading}
          >
            <i className="bi bi-hand-thumbs-up"></i> {likes.likes}
          </button>
        </div>
        
        <div>
          <button 
            className={`btn ${userAction === 'dislike' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => handleAction('dislike')}
            disabled={loading}
          >
            <i className="bi bi-hand-thumbs-down"></i> {likes.dislikes}
          </button>
        </div>
      </div>
      
      {showNameInput && (
        <div className="card p-3 mb-3">
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Tu nombre para registrar tu {userAction === 'like' ? 'Like' : 'Dislike'}
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div>
            <button 
              className="btn btn-primary me-2" 
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Confirmar'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowNameInput(false)}
              disabled={submitting}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeDislikeButtons;