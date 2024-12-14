import { useState, useEffect } from "react";
import { fetchAssemblyData } from "../utils/api";

const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAssemblyData();
      setMembers(data); // 전체 데이터 저장
      setFilteredMembers(data); // 초기 필터 데이터 설정
    };
    fetchData();
  }, []);

  return { members, filteredMembers, setFilteredMembers };
};

export default useMembers;
