ENG | KOR

# Jeonmuyeon Map

Interactive map of Korean military research service (전문연구요원) designated companies for 2025.  
The HTML file originally developed in early 2025 has now been fully modernized and reimplemented in TypeScript.

## Features

- 1,567 designated companies displayed on map
- Search by company name
- Filter by industry type
- Company details with contact info
- Direct links to Jobplanet & Blind reviews

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Leaflet (react-leaflet)

## Data Sources

- Military Manpower Administration (병무청) - 2025 designated company list
- Kakao Local API for geocoding

## Local Development

```bash
cd web
npm install
npm run dev
```
- Open http://localhost:3000

## Deployment
- Deployed on Vercel. Set Root Directory to web.


# 전문연구요원 지정업체 지도

2025년 전문연구요원(병역특례) 지정업체 현황을 지도에서 확인할 수 있는 웹 애플리케이션입니다.  
기존 HTML 파일(2025년 초 제작)을 Typescript로 새단장하여 구성하였습니다.

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
- http://localhost:3000 에서 확인

## 배포

- Vercel에서 자동 배포됩니다. Root Directory를 `web`으로 설정하세요.
