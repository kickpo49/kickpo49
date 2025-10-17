import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Board() {
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // 더미 게시글 25개 생성
  const posts = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    author: `작성자${(i % 10) + 1}`,
    date: new Date(2025, 9, 17 - i).toLocaleDateString('ko-KR'),
    views: Math.floor(Math.random() * 1000)
  }));

  // 페이지네이션 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // 페이지 변경 시 처리
  const handlePageChange = (page) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지당 게시글 수 변경 시 처리
  const handlePostsPerPageChange = (value) => {
  const handlePostsPerPageChange = (value: number) => {
    setPostsPerPage(value);
    setCurrentPage(1); // 첫 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* 헤더 */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">게시판</h1>
            <p className="text-sm text-gray-600 mt-1">
              총 {posts.length}개의 게시글
            </p>
          </div>

          {/* 게시글 수 선택 */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">페이지당 게시글:</span>
              <select
                value={postsPerPage}
                onChange={(e) => handlePostsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={15}>15개</option>
              </select>
            </div>
          </div>

          {/* 게시글 리스트 헤더 */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200 text-sm font-semibold text-gray-700">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
          </div>

          {/* 게시글 리스트 */}
          <div className="divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="col-span-1 text-center text-gray-600 text-sm">
                  {post.id}
                </div>
                <div className="col-span-6">
                  <h3 className="text-gray-800 hover:text-blue-600 font-medium">
                    {post.title}
                  </h3>
                </div>
                <div className="col-span-2 text-center text-gray-600 text-sm">
                  {post.author}
                </div>
                <div className="col-span-2 text-center text-gray-600 text-sm">
                  {post.date}
                </div>
                <div className="col-span-1 text-center text-gray-600 text-sm">
                  {post.views}
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}