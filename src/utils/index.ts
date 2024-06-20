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
