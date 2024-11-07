import { Calculator, X } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Colaborador from '../../../models/Colaborador';
import './CalcularSalarioModal.css';

interface CalcularSalarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  colaborador: Colaborador;
}

function CalcularSalarioModal ({ isOpen, onClose, colaborador }: CalcularSalarioModalProps){
  const navigate = useNavigate();
  const [totalHorasExtras, setHorasExtras] = useState<number>(0);
  const [descontos, setDescontos] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redireciona para o componente de cálculo e carrega o estado
    navigate(`/calcularsalario/${colaborador.id}`, {
      state: {
        totalHorasExtras,
        descontos,
        colaborador
      }
    });
    
    // Fecha o modal
    onClose();
  };

  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Calcular Salário - {colaborador.nome}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label 
                htmlFor="totalHorasExtras"
                className="block text-sm font-medium text-gray-700"
              >
                Horas Extras
              </label>
              <input
                id="totalHorasExtras"
                type="number"
                min="0"
                step="0.5"
                value={totalHorasExtras}
                onChange={(e) => setHorasExtras(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="descontos"
                className="block text-sm font-medium text-gray-700"
              >
                Descontos (R$)
              </label>
              <input
                id="descontos"
                type="number"
                min="0"
                step="0.01"
                value={descontos}
                onChange={(e) => setDescontos(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* rodapé */}
          <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Prosseguir
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default CalcularSalarioModal;