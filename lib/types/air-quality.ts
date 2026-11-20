export type AQICategoryType = 'good' | 'satisfactory' | 'moderate' | 'poor' | 'veryPoor' | 'severe';

export interface PollutantMeasurement {
  value: number;
  unit: string;
  category: AQICategoryType;
  standardLimit: number; // Indian CPCB 24h standard limit
  ratioOfStandard: number;
}

export interface AirQualityData {
  city: string;
  locality?: string;
  latitude: number;
  longitude: number;
  aqi: number;
  category: AQICategoryType;
  categoryLabel: string;
  mainPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'SO2' | 'CO' | 'O3';
  pollutants: {
    pm25: PollutantMeasurement;
    pm10: PollutantMeasurement;
    no2?: PollutantMeasurement;
    so2?: PollutantMeasurement;
    co?: PollutantMeasurement;
    o3?: PollutantMeasurement;
  };
  hourly: {
    time: string;
    aqi: number;
    pm25: number;
    pm10: number;
    type: 'observed' | 'forecast' | 'simulated';
  }[];
  lastUpdated: string;
  source: string;
  isSimulatedDemo: boolean;
  healthAdvisory: string;
}

export interface LocationCoordinates {
  name: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
}
