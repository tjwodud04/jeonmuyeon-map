# 전문연구요원 지정업체 지도

2025년 전문연구요원(병역특례) 지정업체 현황을 지도에서 확인할 수 있는 웹 애플리케이션입니다.

## 기능

- 1,567개 지정업체 지도 표시
- 업체명 검색
- 업종별 필터링
- 업체 클릭 시 상세 정보 표시
- 잡플래닛/블라인드 바로가기

## 기술 스택

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Leaflet (react-leaflet)

## 데이터 출처

- 병무청 전문연구요원 지정업체 명부 (2025년)
- 카카오 Local API (Geocoding)

## 로컬 실행

```bash
cd web
npm install
npm run dev
```

http://localhost:3000 에서 확인

## 배포

Vercel에서 자동 배포됩니다. Root Directory를 `web`으로 설정하세요.

## 아카이브

`archive/` 폴더에는 이전 버전(단일 HTML 파일)이 보관되어 있습니다.
