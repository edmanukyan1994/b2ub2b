"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { DivIcon } from "leaflet";
import type { Locale } from "@/i18n/routing";
import { mapProjects } from "@/content/site-data";
import {
  buildMapMarkerHtml,
  getMapMarkerCategory,
  getMapMarkerLabel,
} from "@/lib/map-markers";

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

function ProjectMarker({
  project,
  locale,
  icon,
}: {
  project: (typeof mapProjects)[number];
  locale: Locale;
  icon: DivIcon;
}) {
  const category = getMapMarkerCategory(project);

  return (
    <Marker icon={icon} position={[project.lat, project.lng]}>
      <Popup className="b2-map-popup" closeButton>
        <div className="b2-map-popup__inner">
          <span className="b2-map-popup__badge">{getMapMarkerLabel(category)}</span>
          <p className="b2-map-popup__title">{project.title[locale]}</p>
          <p className="b2-map-popup__country">{project.country}</p>
          <p className="b2-map-popup__type">{project.type[locale]}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export function ProjectsMap({ locale }: ProjectsMapProps) {
  const [ready, setReady] = useState(false);
  const [icons, setIcons] = useState<Record<string, DivIcon>>({});

  useEffect(() => {
    let active = true;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const nextIcons = Object.fromEntries(
        mapProjects.map((project) => {
          const category = getMapMarkerCategory(project);
          const icon = L.divIcon({
            className: "b2-map-marker-icon",
            html: buildMapMarkerHtml(category),
            iconSize: [44, 52],
            iconAnchor: [22, 50],
            popupAnchor: [0, -46],
          });
          return [project.id, icon];
        }),
      );

      if (active) {
        setIcons(nextIcons);
        setReady(true);
      }
    }

    void init();
    return () => {
      active = false;
    };
  }, []);

  const hasIcons = useMemo(() => Object.keys(icons).length > 0, [icons]);

  if (!ready || !hasIcons) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-white/40 bg-white/10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[45, 35]}
      zoom={4}
      scrollWheelZoom={false}
      className="b2-map-container h-[500px] w-full rounded-[1.25rem]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapProjects.map((project) => (
        <ProjectMarker
          key={project.id}
          project={project}
          locale={locale}
          icon={icons[project.id]}
        />
      ))}
    </MapContainer>
  );
}
