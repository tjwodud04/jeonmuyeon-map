export interface Entity {
  분야: string;
  업체명: string;
  소재지?: string;
  "25년 배정인원"?: string;
  관할청?: string;
  홈페이지?: string | null;
  사업자등록번호?: string | null;
  선정년도?: string | null;
  연락처?: string | null;
  업종명?: string | null;
  주소?: string;
  lat?: number | null;
  lng?: number | null;
}

export interface EntityData {
  metadata: {
    title: string;
    title_ko: string;
    description: string;
    source_files: string[];
    added_fields: string[];
    statistics: {
      allocation: {
        total: number;
        matched: number;
        match_rate: string;
        address_replaced: number;
      };
      new_selection: {
        total: number;
        matched: number;
        match_rate: string;
        address_replaced: number;
      };
    };
    created_at: string;
  };
  allocation_list: {
    description: string;
    count: number;
    columns: string[];
    data: Entity[];
  };
  new_selection_list: {
    description: string;
    count: number;
    columns: string[];
    data: Entity[];
  };
}
