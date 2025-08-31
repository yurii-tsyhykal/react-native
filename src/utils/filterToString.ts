import {ISettings} from '../screen/Filter';

export const filterToString = (settings: ISettings): string => {
  const filters: string[] = [];

  if (settings.isDog !== null && settings.isDog !== undefined) {
    filters.push(`isDog:${settings.isDog}`);
  }

  if (settings.sex && (settings.sex === 'male' || settings.sex === 'female')) {
    filters.push(`sex:'${settings.sex}'`);
  }

  if (settings.size !== null && settings.size !== undefined) {
    filters.push(`size:'${settings.size}'`);
  }

  if (settings.age && settings.age.trim() !== '') {
    filters.push(`age:${settings.age}`);
  }

  if (settings.isVaccinated !== null && settings.isVaccinated !== undefined) {
    filters.push(`isVaccinated:${settings.isVaccinated}`);
  }

  return filters.join(' AND ');
};
