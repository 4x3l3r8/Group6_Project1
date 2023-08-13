export const calculateDateOfBirth = (age) => {
  const currentDate = new Date();
  const birthYear = currentDate.getFullYear() - age;
  const birthDate = new Date(
    birthYear,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return birthDate;
};

export const calculateRetirementDate = (dateOfBirth) => {
  const retirementDate = new Date(dateOfBirth);
  retirementDate.setFullYear(retirementDate.getFullYear() + 65);
  return retirementDate;
};

export const isRetiringIn6Months = (retirementDate) => {
  const currentDate = new Date();
  const sixMonthsFromNow = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 6,
    currentDate.getDate()
  );
  return retirementDate <= sixMonthsFromNow;
};

export const retiringEmployeesIn6Months = (employees) => {
  return employees.filter((employee) => {
    const retirementDate = calculateRetirementDate(
      calculateDateOfBirth(employee.age)
    );
    return isRetiringIn6Months(retirementDate);
  });
};

export const calculateTimeRemaining = (retirementDate) => {
  const currentDate = new Date();
  const timeDiff = retirementDate - currentDate;

  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.floor(timeDiff / millisecondsInDay);

  const monthsRemaining = Math.floor(daysRemaining / 30); // Approximation
  const yearsRemaining = Math.floor(monthsRemaining / 12); // Approximation

  const months = monthsRemaining % 12;
  const days = daysRemaining % 30;
  return { days, months, yearsRemaining };
};
