import { addHours, format, parse, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatarData = (data: string | undefined): string => {
  if (!data) return '';
  
  try {

    // Converte a string de data para objeto Date
    const parsedDate = parse(data, 'yyyy-MM-dd', new Date());

    // Formata a data para o padrão Português Brasil
    return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarHora = (data: string | undefined): string => {
  
  if (!data) return '';
  
  try {
    // Converte a data no formato ISO para um Objeto Date
    const parsedDate = parseISO(data);
    
    // Adiciona 3 horas para compensar o fuso horário (GMT-3)
    const dataAjustada = addHours(parsedDate, 3);

    // Formata a hora para o padrão Português Brasil
    return format(dataAjustada, 'HH:mm', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarDataCompleta = (data: string | undefined): string => {
  if (!data) return '';
  
  try {
    
    // Converte a data ISO para objeto Date
    const parsedDate = parseISO(data);
    
    // Adiciona 3 horas para compensar o fuso horário (GMT-3)
    const dataAjustada = addHours(parsedDate, 3);

    // Formata a data e a hora para o padrão Português Brasil
    return format(dataAjustada, 'dd/MM/yyyy HH:mm', { locale: ptBR });

  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
};
