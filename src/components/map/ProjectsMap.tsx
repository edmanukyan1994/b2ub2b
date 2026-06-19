"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/routing";
import { mapProjects } from "@/content/site-data";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false },
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false },
);

type ProjectsMapProps = {
  locale: Locale;
};

export function ProjectsMap({ locale }: ProjectsMapProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void import("leaflet/dist/leaflet.css");
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-border bg-accent-light">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[45, 35]}
      zoom={4}
      scrollWheelZoom={false}
      className="h-[500px] w-full rounded-2xl border border-border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapProjects.map((project) => (
        <Marker key={project.id} position={[project.lat, project.lng]}>
          <Popup>
            <div className="p-1">
              <p className="font-semibold">{project.title[locale]}</p>
              <p className="text-sm text-muted">{project.country}</p>
              <p className="mt-1 text-xs">{project.type[locale]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
