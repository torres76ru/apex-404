export function getCurrentDateInUTCPlus3() {
  // Get the current date and time in UTC
  const now = new Date();

  // Get the current UTC time in milliseconds since the epoch
  const nowUtc = now.getTime() + now.getTimezoneOffset() * 60000;

  // Create a new date object for UTC+3
  const offset = 3; // UTC+3
  const nowInUtcPlus3 = new Date(nowUtc + 3600000 * offset);

  return nowInUtcPlus3;
}

export function getExpiryTime(): [boolean, Date] {
  const dateInUTCPlus3 = getCurrentDateInUTCPlus3();
  return dateInUTCPlus3.getHours() < 10
    ? [
        true,
        new Date(
          dateInUTCPlus3.getFullYear(),
          dateInUTCPlus3.getMonth(),
          dateInUTCPlus3.getDate(),
          10,
          0,
          0,
          0
        )
      ]
    : [
        false,
        new Date(
          dateInUTCPlus3.getFullYear(),
          dateInUTCPlus3.getMonth(),
          dateInUTCPlus3.getDate(),
          23,
          59,
          59,
          999
        )
      ];
}

export const dateTransform = (date: string): string => {
  const dateObj = new Date(date);

  // Форматирование даты в нужный формат
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};
