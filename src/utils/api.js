import axios from "axios";

// 국회의원 데이터 호출 함수
export const fetchAssemblyData = async () => {
  try {
    const response = await axios.get(
      "https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu",
      {
        params: {
          KEY: "7ad0870915b64a82a334a394151caee5", // API 키
          Type: "json", // 응답 형식
          pIndex: 1, // 페이지 인덱스
          pSize: 300, // 페이지 크기
        },
      }
    );

    // 응답 데이터 확인
    if (
      response.data &&
      response.data.nwvrqwxyaytdsfvhu &&
      response.data.nwvrqwxyaytdsfvhu[1]
    ) {
      return response.data.nwvrqwxyaytdsfvhu[1].row.map((member) => ({
        id: member.MONA_CD, // 고유 ID
      HG_NM: member.HG_NM, // 의원 이름
      HJ_NM: member.HJ_NM, // 한자 이름
      ENG_NM: member.ENG_NM, // 영어 이름
      BTH_DATE: member.BTH_DATE, // 생년월일
      BTH_GBN_NM: member.BTH_GBN_NM, // 생년월일 구분 (양/음)
      POLY_NM: member.POLY_NM, // 정당
      CMITS: member.CMITS, // 소속 위원회
      ORIG_NM: member.ORIG_NM, // 지역구
      ELECT_GBN_NM: member.ELECT_GBN_NM, // 당선 유형
      REELE_GBN_NM: member.REELE_GBN_NM, // 재선 여부
      UNITS: member.UNITS, // 국회의원 대수
      SEX_GBN_NM: member.SEX_GBN_NM, // 성별
      TEL_NO: member.TEL_NO, // 전화번호
      E_MAIL: member.E_MAIL, // 이메일
      HOMEPAGE: member.HOMEPAGE, // 홈페이지
      STAFF: member.STAFF, // 보좌관
      SECRETARY: member.SECRETARY, // 비서관
      SECRETARY2: member.SECRETARY2, // 비서
      ASSEM_ADDR: member.ASSEM_ADDR, // 의원회관 주소
      MEM_TITLE: member.MEM_TITLE, // 주요 이력
      }));
    } else {
      console.error("Invalid response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
    return [];
  }
};
