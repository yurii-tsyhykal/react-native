export const getLocalizedAge = (age: number, language: string): string => {
  const n = Math.abs(age);
  const n10 = n % 10;
  const n100 = n % 100;

  switch (language) {
    case 'uk':
      if (n10 === 1 && n100 !== 11) {
        return `${age} рік`;
      }
      if (n10 >= 2 && n10 <= 4 && !(n100 >= 12 && n100 <= 14)) {
        return `${age} роки`;
      }
      return `${age} років`;

    case 'pl':
      if (n === 1) {
        return `${age} rok`; // 1
      }
      if (n10 >= 2 && n10 <= 4 && !(n100 >= 12 && n100 <= 14)) {
        return `${age} lata`;
      }
      return `${age} lat`;

    case 'en':
      return age === 1 ? `${age} year` : `${age} years`;

    default:
      return `${age}`;
  }
};
