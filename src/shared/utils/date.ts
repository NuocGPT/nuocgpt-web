import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDateByLocalTime = (date: string) =>
  dayjs.utc(date).local().format('DD/MM/YYYY - HH:mm');

export const formatDateUTC = (date: string) => dayjs.utc(date).local();
