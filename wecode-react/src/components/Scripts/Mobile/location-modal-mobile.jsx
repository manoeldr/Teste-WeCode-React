import { useLocationModal } from '../../Main/useLocationModal';
import '../../Styles/Mobile/location-modal-mobile.scss';

export default function LocationModalMobile({ isOpen, onClose, onSave }) {
  const {
    cep,
    cidade,
    estado,
    loading,
    setCidade,
    setEstado,
    handleCepChange,
    handleSubmit,
    handleClose
  } = useLocationModal({ onClose, onSave });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay modal-overlay-mobile" onClick={handleClose}>
      <div className="modal-content modal-content-mobile" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="modal-title">
          Personalize sua experiência e encontre produtos perto de você!
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cep-mobile" className="form-label">
              Código postal<span className="required">*</span>
            </label>
            <input
              id="cep-mobile"
              type="text"
              className="form-input"
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              maxLength="9"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cidade-mobile" className="form-label">Cidade</label>
              <input
                id="cidade-mobile"
                type="text"
                className="form-input"
                placeholder="Opcional"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado-mobile" className="form-label">Estado</label>
              <input
                id="estado-mobile"
                type="text"
                className="form-input"
                placeholder="Opcional"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                disabled={loading}
                maxLength="2"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Buscando...' : 'Salvar endereço'}
          </button>
        </form>
      </div>
    </div>
  );
}