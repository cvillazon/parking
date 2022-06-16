export const formatDateGlobal:FormatDateInterface  = {
  timeStyle: 'medium',
  dateStyle: 'short',
};

interface FormatDateInterface extends Intl.DateTimeFormatOptions{
  [timeStyle: string]:any
}
