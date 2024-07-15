export function getExpiryTime(): [boolean, Date] {
  const now = new Date();
  const utcHours = now.getUTCHours();

  if (utcHours >= 19 || utcHours < 7) {
    // Если текущее время с 19:00 сегодняшнего дня до 7:00 завтрашнего дня
    const expiryDate = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        7,
        0,
        0,
        0
      )
    );
    if (utcHours >= 19) {
      // Если сейчас время после 19:00, установить на 7:00 завтрашнего дня
      expiryDate.setUTCDate(expiryDate.getUTCDate() + 1);
    }
    return [true, expiryDate];
  } else {
    // Если текущее время с 7:00 до 19:00
    return [
      false,
      new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          19,
          0,
          0,
          0
        )
      )
    ];
  }
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
