'use client';

import React, { useEffect, useRef, useState } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import { feature } from 'topojson-client';
import worldTopology from 'world-atlas/countries-110m.json';

interface GlobeLocation {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  latency: string;
}

interface NetworkRoute {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
}

interface InteractiveNetworkGlobeProps {
  locations: GlobeLocation[];
  activeLocationId: string;
  onSelectLocation: (locationId: string) => void;
}

const topology = worldTopology as unknown as Parameters<typeof feature>[0];
const countries = feature(topology, topology.objects.countries);
const countryFeatures = 'features' in countries ? countries.features : [countries];

const ROUTES: NetworkRoute[] = [
  {
    startLat: 32.8,
    startLng: -96.8,
    endLat: 23.8,
    endLng: 90.4,
    color: ['#2563EB', '#10B981'],
  },
  {
    startLat: 39,
    startLng: -77.5,
    endLat: 23.8,
    endLng: 90.4,
    color: ['#6366F1', '#10B981'],
  },
];

export default function InteractiveNetworkGlobe({
  locations,
  activeLocationId,
  onSelectLocation,
}: InteractiveNetworkGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [globeReady, setGlobeReady] = useState(false);
  const activeLocation = locations.find(
    (location) => location.id === activeLocationId,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setDimensions({
        width: Math.round(width),
        height: Math.round(height),
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!globeReady || !activeLocation) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    globeRef.current?.pointOfView(
      {
        lat: activeLocation.latitude,
        lng: activeLocation.longitude,
        altitude: 1.9,
      },
      reducedMotion ? 0 : 800,
    );
  }, [activeLocation, globeReady]);

  const getLocation = (point: object) => {
    if (!('id' in point) || typeof point.id !== 'string') return undefined;
    return locations.find((location) => location.id === point.id);
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D globe. Drag to rotate, scroll to zoom, or choose a network location."
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <Globe
        ref={globeRef}
        width={dimensions.width || 600}
        height={dimensions.height || 400}
        backgroundColor="#F5F8FF"
        globeImageUrl="/globe-ocean.svg"
        showGlobe
        showAtmosphere
        atmosphereColor="#9BBEFF"
        atmosphereAltitude={0.12}
        showGraticules
        polygonsData={countryFeatures}
        polygonCapColor={() => '#C7D8F4'}
        polygonSideColor={() => 'rgba(126, 158, 211, 0.12)'}
        polygonStrokeColor={() => '#FFFFFF'}
        polygonAltitude={0.006}
        polygonLabel={(country) =>
          'properties' in country &&
          typeof country.properties === 'object' &&
          country.properties !== null &&
          'name' in country.properties &&
          typeof country.properties.name === 'string'
            ? country.properties.name
            : ''
        }
        pointsData={locations}
        pointLat={(point) => getLocation(point)?.latitude ?? 0}
        pointLng={(point) => getLocation(point)?.longitude ?? 0}
        pointColor={(point) =>
          getLocation(point)?.id === 'dhaka' ? '#10B981' : '#2563EB'
        }
        pointRadius={(point) =>
          getLocation(point)?.id === activeLocationId ? 0.75 : 0.5
        }
        pointAltitude={(point) =>
          getLocation(point)?.id === activeLocationId ? 0.035 : 0.02
        }
        pointLabel={(point) => {
          const location = getLocation(point);
          return location
            ? `${location.city} · ${location.latency}`
            : '';
        }}
        onPointClick={(point) => {
          const location = getLocation(point);
          if (location) onSelectLocation(location.id);
        }}
        arcsData={ROUTES}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcAltitude={0.14}
        arcDashLength={0.38}
        arcDashGap={0.2}
        arcDashAnimateTime={0}
        arcStroke={0.35}
        pointsTransitionDuration={250}
        onGlobeReady={() => {
          const controls = globeRef.current?.controls();
          if (controls) {
            controls.autoRotate = false;
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.enablePan = true;
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.minDistance = 115;
            controls.maxDistance = 500;
          }
          setGlobeReady(true);
        }}
      />
    </div>
  );
}
