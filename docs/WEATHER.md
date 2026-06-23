# Weather widget — Christchurch

The `/desktop` Win98 shell includes a **Weather — Info** window for **Christchurch, NZ** using [OpenWeather One Call API 4.0](https://openweathermap.org/api/one-call-4) (current weather endpoint). Open the Weather shortcut on the desktop or from the Start menu.

## Setup

1. Sign up at [OpenWeather](https://openweathermap.org/) and subscribe to **One Call by Call** (required for API 4.0).
2. Create an API key in your OpenWeather account.

### Local dev

Add to `.dev.vars` (gitignored):

```bash
OPENWEATHER_API_KEY=your_key_here
```

See `.dev.vars.example`.

### Production

```bash
pnpm wrangler secret put OPENWEATHER_API_KEY
```

Never commit the key to the repository.

## API details

- **Endpoint:** `GET https://api.openweathermap.org/data/4.0/onecall/current`
- **Coordinates:** lat `-43.532`, lon `172.631` (Christchurch)
- **Params:** `units=metric`, `lang=en`
- **Cache:** Worker fetch uses `cacheTtl: 600` (10 minutes)

Implementation: [`src/app/lib/weather.ts`](../src/app/lib/weather.ts)

## Fallback

If the key is missing, the subscription is inactive, or the API returns an error, the weather window displays **Weather unavailable**.
