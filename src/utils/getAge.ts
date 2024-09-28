export const getAge = (date: string) => {
  const birthdate: Date = new Date(date);
  const today: Date = new Date();
  const differenceInMilliseconds = today.getTime() - birthdate.getTime();
  const age = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );
  return age;
};

export const getDeathDate = (birthDate: string, deathDate: string) => {
  const birthdate: Date = new Date(birthDate);
  const deathdate: Date = new Date(deathDate);
  const differenceInMilliseconds = deathdate.getTime() - birthdate.getTime();
  const age = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );
  return age;
};
