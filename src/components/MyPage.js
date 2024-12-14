import React, { useState, useEffect } from "react";
import './MyPage.css';

const MyPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [commentInput, setCommentInput] = useState({}); // 각 항목별 코멘트 상태

  // 로컬스토리지에서 즐겨찾기 데이터 로드
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    // 코멘트 입력 상태 초기화
    const initialComments = {};
    storedFavorites.forEach((fav) => {
      initialComments[fav.id] = fav.comment || "";
    });
    setCommentInput(initialComments);
  }, []);

  // 로컬스토리지에 데이터 저장
  const saveToLocalStorage = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // 코멘트 등록
  const handleCommentAdd = (id) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, comment: commentInput[id] } : fav
    );
    saveToLocalStorage(updatedFavorites);
  };

  // 코멘트 삭제
  const handleCommentDelete = (id) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, comment: "" } : fav
    );
    saveToLocalStorage(updatedFavorites);

    // 입력 상태에서도 삭제
    setCommentInput({ ...commentInput, [id]: "" });
  };

  // 즐겨찾기 삭제
  const handleFavoriteDelete = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    saveToLocalStorage(updatedFavorites);

    // 입력 상태에서도 삭제
    const { [id]: _, ...remainingComments } = commentInput;
    setCommentInput(remainingComments);
  };

  // 코멘트 입력값 업데이트
  const handleCommentChange = (id, value) => {
    setCommentInput({ ...commentInput, [id]: value });
  };

  return (
    <div>
      <h2>마이페이지 - 즐겨찾기 목록</h2>
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <div key={fav.id} className="favorite-item">
            <p>
              <strong>{fav.name}</strong> ({fav.party})
            </p>
            <textarea
              placeholder="코멘트를 입력하세요"
              value={commentInput[fav.id] || ""}
              onChange={(e) => handleCommentChange(fav.id, e.target.value)}
              className="comment-box"
            ></textarea>
            <div className="button-container">
              <button
                onClick={() => handleCommentAdd(fav.id)}
                className="add-comment-button"
              >
                등록
              </button>
              <button
                onClick={() => handleCommentDelete(fav.id)}
                className="delete-comment-button"
              >
                코멘트 삭제
              </button>
              <button
                onClick={() => handleFavoriteDelete(fav.id)}
                className="delete-favorite-button"
              >
                즐겨찾기 삭제
              </button>
            </div>
            {/* 등록된 코멘트 표시 */}
            {fav.comment && (
              <p className="saved-comment">
                <strong>등록된 코멘트:</strong> {fav.comment}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>즐겨찾기한 국회의원이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPage;
