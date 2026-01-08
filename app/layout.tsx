import "./globals.css";

export const metadata = {
  title: "G2C Admin Dashboard",
  description: "Government to Citizen Admin Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans m-0 p-0">
        {children}
      </body>
    </html>
  );
}
