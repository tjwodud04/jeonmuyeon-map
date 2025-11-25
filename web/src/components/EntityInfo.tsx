"use client";

import { Entity } from "@/types/entity";

interface EntityInfoProps {
  entity: Entity | null;
  onClose: () => void;
}

// 회사명에서 부설연구소, (주) 등 제거
function extractCompanyName(name: string): string {
  let result = name;

  // 연구소/연구원 관련 (순서 중요 - 긴 것부터)
  result = result.replace(
    /\s*(기업부설연구소|부설연구소|기술연구소|중앙연구소|기업연구소|종합연구소|연구개발센터)\s*/g,
    ""
  );
  result = result.replace(/\s*(R&D\s*센터|R&D\s*Center)\s*/gi, "");
  result = result.replace(/\s*(연구센터|연구원|연구소)\s*/g, "");

  // 법인 형태
  result = result.replace(/\s*[㈜]\s*/g, "");
  result = result.replace(/\s*\((주|유|재|사|학)\)\s*/g, "");
  result = result.replace(
    /\s*(주식회사|유한회사|재단법인|사단법인|학교법인)\s*/g,
    ""
  );

  // 대학 관련 - 산학협력단 제거
  result = result.replace(/\s*산학협력단\s*/g, "");

  // 캠퍼스/지점/지사 정보 제거
  result = result.replace(/\s*\([^)]*캠퍼스\)\s*/g, "");
  result = result.replace(/\s*\([^)]*지점\)\s*/g, "");
  result = result.replace(/\s*\([^)]*지사\)\s*/g, "");

  // 영문 연구소 표현
  result = result.replace(/\s*\(R&D Lab\.?\)\s*/gi, "");
  result = result.replace(/\s*\(Research Center\)\s*/gi, "");
  result = result.replace(/\s*Institute of Technology\s*/gi, "");

  return result.trim();
}

export default function EntityInfo({ entity, onClose }: EntityInfoProps) {
  if (!entity) return null;

  const companyName = extractCompanyName(entity.업체명);
  const jobplanetUrl = `https://www.jobplanet.co.kr/search?query=${encodeURIComponent(companyName)}`;
  const blindUrl = `https://www.teamblind.com/kr/company/${encodeURIComponent(companyName)}/`;

  return (
    <div className="absolute bottom-4 right-4 w-[350px] bg-white rounded-lg shadow-xl border border-gray-200 z-[1000]">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-900">{entity.업체명}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* 내용 */}
      <div className="p-4 space-y-3">
        <InfoRow label="업종" value={entity.업종명 || entity.분야} />
        <InfoRow label="주소" value={entity.소재지} />
        <InfoRow label="관할청" value={entity.관할청} />
        <InfoRow label="25년 배정인원" value={entity["25년 배정인원"]} />
        <InfoRow label="선정년도" value={entity.선정년도} />
        <InfoRow label="사업자등록번호" value={entity.사업자등록번호} />
        <InfoRow label="연락처" value={entity.연락처} />

        {entity.홈페이지 && (
          <div className="flex text-sm">
            <span className="text-gray-500 w-28 flex-shrink-0">홈페이지</span>
            <a
              href={
                entity.홈페이지.startsWith("http")
                  ? entity.홈페이지
                  : `https://${entity.홈페이지}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {entity.홈페이지}
            </a>
          </div>
        )}

        {/* 잡플래닛 & 블라인드 버튼 */}
        <div className="flex gap-2 pt-2 border-t border-gray-100 mt-3">
          <a
            href={jobplanetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 text-xs font-medium text-center text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
          >
            잡플래닛
          </a>
          <a
            href={blindUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 text-xs font-medium text-center text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            블라인드
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;

  return (
    <div className="flex text-sm">
      <span className="text-gray-500 w-28 flex-shrink-0">{label}</span>
      <span className="text-gray-900 break-all">{value}</span>
    </div>
  );
}
