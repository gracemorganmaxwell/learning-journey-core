"use client";

import type { WeatherSnapshot } from "@/app/lib/weather";

import styles from "./WeatherWindowContent.module.css";

type WeatherWindowContentProps = {
  weather: WeatherSnapshot | null;
};

export function WeatherWindowContent({ weather }: WeatherWindowContentProps) {
  if (!weather) {
    return (
      <div className={styles.body}>
        <p className={styles.unavailable}>
          Weather unavailable. Check OPENWEATHER_API_KEY and One Call subscription.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt=""
        className={styles.icon}
        width={64}
        height={64}
      />
      <div className={styles.details}>
        <p className={styles.city}>{weather.city}, New Zealand</p>
        <p className={styles.temp}>{weather.tempC}°C</p>
        <p className={styles.desc}>{weather.description}</p>
        <p className={styles.footer}>OpenWeather One Call API</p>
      </div>
    </div>
  );
}
