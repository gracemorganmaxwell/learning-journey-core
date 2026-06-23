import { env } from "cloudflare:workers";

export type WeatherSnapshot = {
  tempC: number;
  description: string;
  icon: string;
  city: string;
};

type OneCallCurrentResponse = {
  data?: Array<{
    temp?: number;
    weather?: Array<{ description?: string; icon?: string }>;
  }>;
};

const CHRISTCHURCH_LAT = -43.532;
const CHRISTCHURCH_LON = 172.631;

export async function fetchChristchurchCurrent(): Promise<WeatherSnapshot | null> {
  const apiKey = env.OPENWEATHER_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  const url = new URL("https://api.openweathermap.org/data/4.0/onecall/current");
  url.searchParams.set("lat", String(CHRISTCHURCH_LAT));
  url.searchParams.set("lon", String(CHRISTCHURCH_LON));
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "en");
  url.searchParams.set("appid", apiKey);

  try {
    const response = await fetch(url.toString(), {
      cf: { cacheTtl: 600 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as OneCallCurrentResponse;
    const current = payload.data?.[0];
    if (!current?.temp) {
      return null;
    }

    return {
      tempC: Math.round(current.temp),
      description: current.weather?.[0]?.description ?? "Unknown",
      icon: current.weather?.[0]?.icon ?? "01d",
      city: "Christchurch",
    };
  } catch {
    return null;
  }
}
