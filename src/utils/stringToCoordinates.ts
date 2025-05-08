/**
 * Converts a twelve-digit string to latitude and longitude coordinates
 * Format: first 6 digits for latitude, last 6 digits for longitude
 * Inserts decimal point after the first 2 digits in each group
 *
 * @param {string} twelveDigitString - A string of exactly 12 digits
 * @returns {string} Formatted coordinates as "lat.itude long.itude"
 */
export function stringToCoordinates(twelveDigitString: string) {
  // Validate input
  if (!/^\d{12}$/.test(twelveDigitString)) {
    throw new Error("Input must be a string of exactly 12 digits");
  }

  // Split the string into two parts: first 6 digits for latitude, last 6 for longitude
  const lat = twelveDigitString.substring(0, 6);
  const long = twelveDigitString.substring(6, 12);

  // Format with decimal point after the first 2 digits
  const formattedLat = lat.substring(0, 2) + "." + lat.substring(2);
  const formattedLong = long.substring(0, 2) + "." + long.substring(2);

  // Return formatted coordinates
  return `${formattedLat} ${formattedLong}`;
}

// Example usage:
// const coords = stringToCoordinates("521234621234");
// console.log(coords); // Output: "52.1234 62.1234"
