import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

const MemberDetail = ({ members }) => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [memberDetails, setMemberDetails] = useState(null); // 세부 정보 상태
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  // URL의 ID를 사용해 API 또는 데이터에서 해당 인원 찾기
  useEffect(() => {
    const fetchMemberDetails = async () => {
      const member = members?.find((m) => String(m.id) === id);
      if (member) {
        setMemberDetails(member); // members 배열에서 데이터 가져오기
      } else {
        try {
          const response = await axios.get(
            `https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu`,
            {
              params: {
                KEY: "7ad0870915b64a82a334a394151caee5",
                Type: "json",
                pIndex: 1,
                pSize: 300,
              },
            }
          );
          const data = response.data.nwvrqwxyaytdsfvhu[1].row;
          const foundMember = data.find((m) => String(m.HG_NM) === id); // API에서 데이터 검색
          setMemberDetails(foundMember || null);
        } catch (error) {
          console.error("API 호출 오류:", error);
        }
      }
    };
    fetchMemberDetails();
  }, [id, members]);

  // 즐겨찾기 초기화 및 상태 업데이트
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => String(fav.id) === id));
  }, [id]);

  // 즐겨찾기 추가/제거
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => String(fav.id) !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push({
        id,
        name: memberDetails.HG_NM,
        party: memberDetails.POLY_NM,
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!memberDetails) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="member-detail-container">
      <div className="member-detail-header">
        <h2>{memberDetails.HG_NM}</h2>
        <p className="party">{memberDetails.POLY_NM}</p>
        <button onClick={toggleFavorite} className="filter-button">
          {isFavorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
        </button>
      </div>
      <div className="member-detail-body">
         <h2>{memberDetails.HG_NM} ({memberDetails.POLY_NM})</h2>
      <p><strong>한자 이름:</strong> {memberDetails.HJ_NM}</p>
      <p><strong>영문 이름:</strong> {memberDetails.ENG_NM}</p>
      <p><strong>생년월일:</strong> {memberDetails.BTH_DATE} ({memberDetails.BTH_GBN_NM})</p>
      <p><strong>소속 정당:</strong> {memberDetails.POLY_NM}</p>
      <p><strong>소속 위원회:</strong> {memberDetails.CMITS}</p>
      <p><strong>지역구:</strong> {memberDetails.ORIG_NM}</p>
      <p><strong>당선 유형:</strong> {memberDetails.ELECT_GBN_NM}</p>
      <p><strong>재선 여부:</strong> {memberDetails.REELE_GBN_NM}</p>
      <p><strong>국회의원 대수:</strong> {memberDetails.UNITS}</p>
      <p><strong>성별:</strong> {memberDetails.SEX_GBN_NM}</p>
      <p><strong>전화번호:</strong> {memberDetails.TEL_NO}</p>
      <p><strong>이메일:</strong> <a href={`mailto:${memberDetails.E_MAIL}`}>{memberDetails.E_MAIL}</a></p>
      <p><strong>홈페이지:</strong> <a href={memberDetails.HOMEPAGE} target="_blank" rel="noopener noreferrer">{memberDetails.HOMEPAGE}</a></p>
      <p><strong>보좌관:</strong> {memberDetails.STAFF}</p>
      <p><strong>비서관:</strong> {memberDetails.SECRETARY}</p>
      <p><strong>비서:</strong> {memberDetails.SECRETARY2}</p>
      <p><strong>의원회관 주소:</strong> {memberDetails.ASSEM_ADDR}</p>
      <p><strong>주요 이력:</strong></p>
      <pre className="member-history">{memberDetails.MEM_TITLE}</pre>
      </div>
      <Link to="/" className="back-link">홈으로 돌아가기</Link>
    </div>
  );
};

export default MemberDetail;
