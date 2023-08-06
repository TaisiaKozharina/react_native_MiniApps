import axios from "axios";

export interface Coordinates {
  lat: number;
  long: number;
}

export class MeteoAPI {
  static async fetchWeatherByCoord(coords: Coordinates) {
    return (
      await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.long}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      )
    ).data;
  }

  static async fetchCityByCoord(coords: Coordinates) {
    const {
      address: { city, village, town },
    } = (
      await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.long}&accept-language=en`
      )
    ).data;

    return city || village || town;
  }

  static async fetchCoordsByCity(city: string) {
    try {
      const { latitude: lat, longitude: long } = (
        await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        )
      ).data.results[0];
      return { lat, long } as Coordinates;
    } catch (error) {
      throw "Invalid City name";
    }
  }
}
