export const WEATHER_INTEPRET = [
  {
    codes: [0],
    image: require("../assets/interpret_icons/sun.png"),
    label: "Sunny",
  },
  {
    codes: [1, 2, 3, 45, 48],
    label: "Cloudy",
    image: require("../assets/interpret_icons/clouds.png"),
  },
  {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86],
    label: "Rainy",
    image: require("../assets/interpret_icons/rain.png"),
  },
  {
    codes: [71, 73, 75, 77],
    label: "Snowy",
    image: require("../assets/interpret_icons/snow.png"),
  },
  {
    codes: [95, 96, 99],
    label: "Thunderous",
    image: require("../assets/interpret_icons/thunder.png"),
  },
];

export function getInterpretation(code: number) {
  return WEATHER_INTEPRET.find((i) => i.codes.includes(code));
}

export const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
