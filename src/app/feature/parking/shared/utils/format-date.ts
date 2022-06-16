export const formatDateGlobal:formatDateInterface  = {
  timeStyle: 'medium',
  dateStyle: 'short',
};

interface formatDateInterface extends Intl.DateTimeFormatOptions{
  [timeStyle: string]:any
}
