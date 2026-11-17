
import { useEffect } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, player }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !player) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="modal__overlay"
      onClick={handleOverlayClick}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          ✕
        </button>

        <h2 id="modal-title" className="modal__title">
          {player.name}
        </h2>

        <p className="modal__subtitle">
          {player.position} · {player.country}
        </p>

        <div className="modal__details">
          <div>
            <span>Club</span>
            <strong>{player.club}</strong>
          </div>

          <div>
            <span>Número</span>
            <strong>{player.number}</strong>
          </div>

          <div>
            <span>Edad</span>
            <strong>{player.age} años</strong>
          </div>

          <div>
            <span>Goles</span>
            <strong>{player.goals}</strong>
          </div>

          <div>
            <span>Asistencias</span>
            <strong>{player.assists}</strong>
          </div>

          <div>
            <span>Posición</span>
            <strong>{player.position}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Modal;
