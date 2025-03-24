export const CAR_FEATURES = [
  {
    name: "transmission",
    label: "Mjenjač",
    type: "select",
    options: [
      { value: "manual", label: "Manuelni" },
      { value: "automatic", label: "Automatski" },
      { value: "semi-automatic", label: "Polu-automatski" },
      { value: "cvt", label: "CVT (kontinuirano promjenjiv)" },
    ],
  },
  {
    name: "drivetrain",
    label: "Pogon",
    type: "select",
    options: [
      { value: "fwd", label: "Prednji pogon (FWD)" },
      { value: "rwd", label: "Zadnji pogon (RWD)" },
      { value: "awd", label: "Pogon na sve točkove (AWD)" },
      { value: "4wd", label: "Pogon na četiri točka (4WD)" },
    ],
  },
  {
    name: "airConditioning",
    label: "Klima uređaj",
    type: "checkbox",
  },
  {
    name: "gps",
    label: "GPS navigacija",
    type: "checkbox",
  },
  {
    name: "sunroof",
    label: "Krovni prozor",
    type: "checkbox",
  },
  {
    name: "leatherSeats",
    label: "Kožna sjedišta",
    type: "checkbox",
  },
  {
    name: "heatedSeats",
    label: "Grijanje sjedišta",
    type: "checkbox",
  },
  {
    name: "parkingSensors",
    label: "Parking senzori",
    type: "checkbox",
  },
  {
    name: "rearCamera",
    label: "Kamera za vožnju unazad",
    type: "checkbox",
  },
  {
    name: "blindSpotMonitor",
    label: "Senzor mrtvog ugla",
    type: "checkbox",
  },
  {
    name: "cruiseControl",
    label: "Tempomat",
    type: "checkbox",
  },
  {
    name: "adaptiveCruiseControl",
    label: "Adaptivni tempomat",
    type: "checkbox",
  },
  {
    name: "laneAssist",
    label: "Pomoć pri zadržavanju trake",
    type: "checkbox",
  },
  {
    name: "autonomousDriving",
    label: "Autonomna vožnja",
    type: "select",
    options: [
      { value: "none", label: "Nema" },
      { value: "level1", label: "Nivo 1 (Pomoć pri vožnji)" },
      { value: "level2", label: "Nivo 2 (Djelimična autonomija)" },
      { value: "level3", label: "Nivo 3 (Uslovna autonomija)" },
    ],
  },
];

export const FUEL_TYPE_TRANSLATIONS = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  ELECTRIC: "Električni",
  HYBRID: "Hibrid",
};
