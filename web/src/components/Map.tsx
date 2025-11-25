"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Entity } from "@/types/entity";

interface MapProps {
  entities: Entity[];
  selectedEntity: Entity | null;
  onMarkerClick: (entity: Entity) => void;
}

// 선택된 마커로 이동하는 컴포넌트
function FlyToMarker({ entity }: { entity: Entity | null }) {
  const map = useMap();

  useEffect(() => {
    if (entity?.lat && entity?.lng) {
      map.flyTo([entity.lat, entity.lng], 15, {
        duration: 1,
      });
    }
  }, [entity, map]);

  return null;
}

export default function Map({
  entities,
  selectedEntity,
  onMarkerClick,
}: MapProps) {
  // 기본 마커 아이콘
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // 선택된 마커 아이콘 (빨간색)
  const selectedIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // 좌표가 있는 업체만 필터링
  const entitiesWithCoords = entities.filter(
    (e) => e.lat != null && e.lng != null
  );

  return (
    <MapContainer
      center={[36.5, 127.5]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToMarker entity={selectedEntity} />
      {entitiesWithCoords.map((entity, index) => (
        <Marker
          key={`${entity.업체명}-${index}`}
          position={[entity.lat!, entity.lng!]}
          icon={
            selectedEntity?.업체명 === entity.업체명 ? selectedIcon : defaultIcon
          }
          eventHandlers={{
            click: () => onMarkerClick(entity),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-base mb-2">{entity.업체명}</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-gray-500">업종:</span>{" "}
                  {entity.업종명 || entity.분야}
                </p>
                <p>
                  <span className="text-gray-500">주소:</span>{" "}
                  {entity.주소 || entity.소재지}
                </p>
                {entity.연락처 && (
                  <p>
                    <span className="text-gray-500">연락처:</span>{" "}
                    {entity.연락처}
                  </p>
                )}
                {entity.홈페이지 && (
                  <p>
                    <span className="text-gray-500">홈페이지:</span>{" "}
                    <a
                      href={
                        entity.홈페이지.startsWith("http")
                          ? entity.홈페이지
                          : `https://${entity.홈페이지}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {entity.홈페이지}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
