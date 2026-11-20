import { LocationCoordinates } from "../types/air-quality";

// Standard Indian Metropolitan and Industrial Urban Presets
export const INDIAN_CITY_PRESETS: Record<string, LocationCoordinates> = {
  Delhi: {
    name: "Delhi",
    state: "Delhi",
    country: "India",
    latitude: 28.6139,
    longitude: 77.2090,
  },
  Kolkata: {
    name: "Kolkata",
    state: "West Bengal",
    country: "India",
    latitude: 22.5726,
    longitude: 88.3639,
  },
  Mumbai: {
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777,
  },
  Bengaluru: {
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  Asansol: {
    name: "Asansol",
    state: "West Bengal",
    country: "India",
    latitude: 23.6889,
    longitude: 86.9661,
  },
  Lucknow: {
    name: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    latitude: 26.8467,
    longitude: 80.9462,
  },
  Patna: {
    name: "Patna",
    state: "Bihar",
    country: "India",
    latitude: 25.5941,
    longitude: 85.1376,
  },
  Chennai: {
    name: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    latitude: 13.0827,
    longitude: 80.2707,
  },
  Hyderabad: {
    name: "Hyderabad",
    state: "Telangana",
    country: "India",
    latitude: 17.3850,
    longitude: 78.4867,
  },
  Pune: {
    name: "Pune",
    state: "Maharashtra",
    country: "India",
    latitude: 18.5204,
    longitude: 73.8567,
  },
};

// CPCB National Air Quality Index (NAQI) Breakpoints (ug/m3 for PM2.5 and PM10)
export const CPCB_BREAKPOINTS = {
  pm25: [
    { bLo: 0, bHi: 30, iLo: 0, iHi: 50, cat: "good" as const },
    { bLo: 31, bHi: 60, iLo: 51, iHi: 100, cat: "satisfactory" as const },
    { bLo: 61, bHi: 90, iLo: 101, iHi: 200, cat: "moderate" as const },
    { bLo: 91, bHi: 120, iLo: 201, iHi: 300, cat: "poor" as const },
    { bLo: 121, bHi: 250, iLo: 301, iHi: 400, cat: "veryPoor" as const },
    { bLo: 251, bHi: 500, iLo: 401, iHi: 500, cat: "severe" as const },
  ],
  pm10: [
    { bLo: 0, bHi: 50, iLo: 0, iHi: 50, cat: "good" as const },
    { bLo: 51, bHi: 100, iLo: 51, iHi: 100, cat: "satisfactory" as const },
    { bLo: 101, bHi: 250, iLo: 101, iHi: 200, cat: "moderate" as const },
    { bLo: 251, bHi: 350, iLo: 201, iHi: 300, cat: "poor" as const },
    { bLo: 351, bHi: 430, iLo: 301, iHi: 400, cat: "veryPoor" as const },
    { bLo: 431, bHi: 600, iLo: 401, iHi: 500, cat: "severe" as const },
  ],
};

// CPCB 24-hour Safe Standards (ug/m3)
export const CPCB_STANDARDS = {
  pm25: 60,  // National Standard 60 ug/m3
  pm10: 100, // National Standard 100 ug/m3
  no2: 80,   // National Standard 80 ug/m3
  so2: 80,   // National Standard 80 ug/m3
  co: 2,     // 2 mg/m3
  o3: 100,   // 8-hour 100 ug/m3
};
