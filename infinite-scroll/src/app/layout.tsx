import type { Metadata } from "next";
import "@/app/globals.css";
import MockProvider from "@/provider/MockProvider";
import DataProvider from "@/provider/DataProvider";

export const metadata: Metadata = {
  title: "infinite-scroll",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <MockProvider>{children}</MockProvider>
        </DataProvider>
      </body>
    </html>
  );
}
