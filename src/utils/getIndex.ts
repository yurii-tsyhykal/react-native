export const getIndex = (timeStamp: boolean | null) => {
  if (timeStamp === true) {
    return 'animals_timestamp_desc';
  }
  if (timeStamp === false) {
    return 'animals_timestamp_asc';
  }
  return 'animals';
};
