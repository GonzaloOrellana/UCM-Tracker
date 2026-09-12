/**
 * Utilidades para formateo de fechas y cuentas regresivas del MCU
 */

export const formatDateDisplay = (dateStr?: string): string => {
  if (!dateStr) return 'Próximamente';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export const getCountdownLabel = (dateStr?: string): string => {
  if (!dateStr) return 'Próximamente';
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (isNaN(days)) return 'Próximamente';
  if (days <= 0) return 'Disponible';
  if (days === 1) return 'Mañana';
  if (days <= 45) return `En ${days} días`;

  const parts = dateStr.split('-');
  if (parts.length >= 2) {
    const monthsMap = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const monthName = monthsMap[monthIdx] || parts[1];
    return `${monthName} ${parts[0]}`;
  }
  return dateStr;
};
