export const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "numeric",
  day: "numeric",
};

export const TODAY = new Date();

export function toHourMinuteFormat(date: Date) {
  const currentDate = new Date(date);

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function upcomingWeekDates() {
  
  const week: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(TODAY);
    week.push(
      new Intl.DateTimeFormat("en-GB", DATE_TIME_OPTIONS).format(
        date.setDate(date.getDate() + i),
      ),
    );
  }

  return week;
}

