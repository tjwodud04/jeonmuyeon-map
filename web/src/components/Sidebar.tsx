"use client";

import { useState, useMemo } from "react";
import { Entity } from "@/types/entity";

interface SidebarProps {
  entities: Entity[];
  selectedEntity: Entity | null;
  onEntityClick: (entity: Entity) => void;
}

export default function Sidebar({
  entities,
  selectedEntity,
  onEntityClick,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  // 업종 목록 추출
  const industries = useMemo(() => {
    const industrySet = new Set<string>();
    entities.forEach((e) => {
      if (e.업종명) industrySet.add(e.업종명);
    });
    return Array.from(industrySet).sort();
  }, [entities]);

  // 필터링된 업체 목록
  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      const matchesSearch =
        searchTerm === "" ||
        entity.업체명.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "all" || entity.업종명 === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [entities, searchTerm, selectedIndustry]);

  return (
    <div className="w-[400px] h-full bg-white border-r border-gray-200 flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          전문연구요원 지정업체 지도
        </h1>
        <p className="text-xs text-gray-500 mb-3">2025년 기준</p>

        {/* 안내 문구 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 space-y-1">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">안내:</span> 4개년(2022-2025) 중 2년
            이상 배정제한, 미배정, 미신청인 업체는 제외되었습니다.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 space-y-1">
          <p className="text-xs text-amber-700"> <span className="font-semibold">안내:</span> 잡플래닛/블라인드는 리뷰가 없는 경우도 있습니다.
          </p>
        </div>

        {/* 검색 */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="업체명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 업종 선택 */}
        <div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">전체 업종 ({entities.length})</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry} (
                {entities.filter((e) => e.업종명 === industry).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 검색 결과 카운트 */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          검색 결과: <span className="font-semibold">{filteredEntities.length}</span>개
        </p>
      </div>

      {/* 업체 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredEntities.map((entity, index) => (
          <div
            key={`${entity.업체명}-${index}`}
            onClick={() => onEntityClick(entity)}
            className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
              selectedEntity?.업체명 === entity.업체명
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : "hover:bg-gray-50"
            }`}
          >
            <h3 className="font-medium text-gray-900 text-sm">
              {entity.업체명}
            </h3>
            <p className="text-xs text-gray-500">
              {entity.업종명 || entity.분야}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
