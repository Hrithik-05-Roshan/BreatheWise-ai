# Known Limitations & Transparent Boundary Notes

1. **Environmental Sensor Representation:**
   - Outdoor air quality data reflects city-level meteorological modeling (Open-Meteo European Agency dataset) and CPCB monitoring stations. It does not replace micro-local hyper-targeted street sensor nodes.
2. **Clinical & Medical Non-Equivalence:**
   - The personal exposure score is a relative environmental risk estimation model based on lifestyle inputs and atmospheric concentrations. It is **not** a clinically validated personal dosimeter or medical diagnosis.
3. **Multi-User Authentication in Prototype:**
   - This hackathon prototype prioritizes user privacy through a local-first browser storage model (`localStorage`). Multi-tenant synchronized database accounts (e.g. Supabase/PostgreSQL) are marked for future production roadmap.
4. **Houseplants Filtration Capacity:**
   - The system explicitly notes that while houseplants provide psychological well-being, scientific evidence confirms they cannot filter microscopic PM2.5 particulates from full residential room volumes.
