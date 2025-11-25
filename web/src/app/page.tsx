"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import EntityInfo from "@/components/EntityInfo";
import { Entity, EntityData } from "@/types/entity";

// Leaflet은 SSR 미지원이므로 dynamic import
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">지도 로딩 중...</div>
    </div>
  ),
});

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터 로드
    fetch("/data/entities.json")
      .then((res) => res.json())
      .then((data: EntityData) => {
        // allocation_list와 new_selection_list 합치기
        const allEntities = [
          ...data.allocation_list.data,
          ...data.new_selection_list.data,
        ];
        setEntities(allEntities);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로드 실패:", err);
        setLoading(false);
      });
  }, []);

  const handleEntityClick = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleCloseInfo = () => {
    setSelectedEntity(null);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">데이터 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex">
      {/* 왼쪽 사이드바 */}
      <Sidebar
        entities={entities}
        selectedEntity={selectedEntity}
        onEntityClick={handleEntityClick}
      />

      {/* 오른쪽 지도 영역 */}
      <div className="flex-1 relative">
        <Map
          entities={entities}
          selectedEntity={selectedEntity}
          onMarkerClick={handleEntityClick}
        />

        {/* 선택된 업체 정보 패널 */}
        <EntityInfo entity={selectedEntity} onClose={handleCloseInfo} />
      </div>
    </div>
  );
}
