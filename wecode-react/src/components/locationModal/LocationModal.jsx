import { useState } from 'react';
import './LocationModal.scss';

export default function LocationModal({ isOpen, onClose, onSave }) {
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = async (e) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);

    const cleanCep = formatted.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setCidade(data.localidade);
          setEstado(data.uf);
        }
      } catch {
        console.error('Erro ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cep.replace(/\D/g, '').length !== 8) {
      alert('CEP inválido');
      return;
    }

    const location = cidade && estado ? `${cidade}, ${estado}` : 'Localização não encontrada';
    onSave(location);
    handleClose();
  };

  const handleClose = () => {
    setCep('');
    setCidade('');
    setEstado('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
            <label htmlFor="cep" className="form-label">
              Código postal<span className="required">*</span>
            </label>
            <input
              id="cep"
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
              <label htmlFor="cidade" className="form-label">Cidade</label>
              <input
                id="cidade"
                type="text"
                className="form-input"
                placeholder="Opcional"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado" className="form-label">Estado</label>
              <input
                id="estado"
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