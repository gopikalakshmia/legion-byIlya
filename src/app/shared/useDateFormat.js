import { format, isValid, getHours, getMinutes, isSameDay } from 'date-fns';

export default function useDateFormat(timeStart, timeEnd) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (!isValid(date)) return null;
    
    const month = format(date, 'MMM').toUpperCase();
    const fullMonth = format(date, 'MMMM');
    const day = format(date, 'd');
    const weekday = format(date, 'EEEE');
    const year = format(date, 'yyyy');
    
    let hour = getHours(date);
    let minutes = getMinutes(date);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    const timeString = minutes === 0
      ? `${hour}${ampm}`
      : `${hour}:${minutes.toString().padStart(2, '0')}${ampm}`;

    return {
      month,
      fullMonth,
      day,
      weekday,
      time: timeString,
      year,
    };
  };

  const startInfo = formatDate(timeStart);
  const endInfo = formatDate(timeEnd);
  
  const areSameDay = startInfo && endInfo && isSameDay(
    new Date(timeStart),
    new Date(timeEnd)
  );

  return {
    start: startInfo,
    end: endInfo,
    isSameDay: areSameDay,
    displayDate: areSameDay
      ? `${startInfo.month} ${startInfo.day}`
      : `${startInfo?.month} ${startInfo?.day} - ${endInfo?.month} ${endInfo?.day}`,
    displayTime: areSameDay
      ? `${startInfo.time} - ${endInfo.time}`
      : null
  };
}