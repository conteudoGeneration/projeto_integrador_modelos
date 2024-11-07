import { addHours, format, parseISO, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatarData = (data: string | undefined): string => {
  
  if (!data) return '';
  
  try {

    // Converte a data ISO para objeto Date
    const dataIso = parseISO(data);
    
    // Formata a data no padrão Português Brasil
    return format(dataIso, 'dd/MM/yyyy', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarHora = (data: string | undefined): string => {
  
  if (!data) return '';
  
  try {
    
    // Converte a data ISO para objeto Date
    const dataIso = parseISO(data);
    
    // Adiciona 3 horas para compensar o fuso horário (GMT-3)
    const dataTZ = addHours(dataIso, 3);

    // Formata a hora no padrão Português Brasil
    return format(dataTZ, 'HH:mm', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarDataCompleta = (data: string | undefined): string => {
  if (!data) return '';
  
  try {
    // Converte a data ISO para objeto Date
    const dataIso = parseISO(data);
    
    // Adiciona 3 horas para compensar o fuso horário (GMT-3)
    const dataTZ = addHours(dataIso, 3);

    // Formata a data com a hora no padrão Português Brasil
    return format(dataTZ, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
};

// Formatar a data para ser carregada no input DateTime-Local
export const formatarDataInputDateTime = (data: string | undefined): string => {
  if (!data) return '';
  
  try {
    // Se a data já estiver no formato do do Input DateTime-Local, 
    // retorna a própria data
    if (data.includes('T')) {

      /** 
       * Retira os milisegundos da data (o que vem depopis do ponto)
       * Exemplo: 
       * Entrada: "2023-10-25T13:45:30.000Z" 
       * Saída: "2023-10-25T13:45:30"
       * */ 
      const [dataParte] = data.split('.');
      return dataParte;
    }
    
    // Caso contrário, converte a data para um Objeto Date
    const date = new Date(data);

    // Formata a Data para o formato do Input DateTime-Local
    return format(date, "yyyy-MM-dd'T'HH:mm");

  } catch (error) {
    console.error('Erro ao formatar data para input:', error);
    return '';
  }
};

// Formatar a data recebida do Input DateTime-Local para enviar para o Backend
export const formatarDataSubmit = (data: string, foiAlterada: boolean): string => {
  if (!data) return '';
  
  try {
    
    // Se a data não foi alterada, retorna ela mesma
    if (!foiAlterada) {
      return data;
    }

    // Se a data foi alterada, converte para um Objeto Date
    const localDate = new Date(data);

    // Ajusta o fuso-horário (GMT-3)
    const dataAjustada = subHours(localDate, 3);

    // Formata a data no formato ISO
    return dataAjustada.toISOString();

  } catch (error) {
    console.error('Erro ao formatar data para envio:', error);
    return '';
  }
};