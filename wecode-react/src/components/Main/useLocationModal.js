import { useState } from 'react';

export function useLocationModal({ onClose, onSave }) {
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

  return {
    cep,
    cidade,
    estado,
    loading,
    setCidade,
    setEstado,
    handleCepChange,
    handleSubmit,
    handleClose
  };
}