import desktopStyles from "@/app/styles/desktop.css?url";
import adminStyles from "@/app/styles/admin.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Learning Journey</title>
      <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/logo.png" type="image/png" sizes="192x192" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:wght@600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
      />
      <link rel="stylesheet" href={desktopStyles} />
      <link rel="stylesheet" href={adminStyles} />
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      {children}
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
