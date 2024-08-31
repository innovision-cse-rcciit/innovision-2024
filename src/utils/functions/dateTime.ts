import { useState, useEffect } from 'react';

export const useCurrentDateTime = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      setDay(date.toLocaleString('en-GB', { day: 'numeric' }));
      setMonth(date.toLocaleString('en-GB', { month: 'long' }));
      setYear(date.getFullYear().toString());
      setHours(date.getHours().toString().padStart(2, '0'));
      setMinutes(date.getMinutes().toString().padStart(2, '0'));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { day, month, year, hours, minutes };
};
