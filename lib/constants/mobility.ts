/**
 * Standard Indian Urban Mobility & Emission Factors
 * Verified baseline data derived from:
 * - Central Pollution Control Board (CPCB) Comprehensive Air Action Plan
 * - Ministry of Housing and Urban Affairs (MoHUA) Urban Mobility Guidelines
 * - Central Electricity Authority (CEA) CO2 Baseline Database for the Indian Power Sector
 */

export const EMISSION_FACTORS = {
  car: 0.165, // kg CO2 / km (Petrol hatchback/sedan average urban cycle)
  two_wheeler: 0.045, // kg CO2 / km (4-stroke motorcycle/scooter)
  public_transport: 0.015, // kg CO2 / pass-km (Metro rail & CNG bus fleet combined)
  bicycle: 0.0, // kg CO2 / km (Zero direct operational emissions)
  walking: 0.0, // kg CO2 / km (Zero direct operational emissions)
} as const;

/**
 * Average urban travel speeds in Indian metropolitan corridors (km/h)
 * Derived from urban transit corridor studies in Delhi-NCR, Mumbai, and Bengaluru.
 */
export const AVERAGE_SPEED_KMH = {
  car: 22,
  two_wheeler: 26,
  public_transport: 28, // Dedicated metro rail or bus rapid transit
  bicycle: 14,
  walking: 4.5,
} as const;

/**
 * Average urban travel cost (INR per kilometer)
 * Incorporates amortized fuel/energy, vehicle maintenance, and typical parking tolls.
 */
export const COST_PER_KM = {
  car: 12.0,
  two_wheeler: 3.2,
  public_transport: 2.5,
  bicycle: 0.2,
  walking: 0.0,
} as const;
