interface ProfilePaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
}

export const ProfilePagination = ({ page, setPage, hasMore }: ProfilePaginationProps) => {
  const handlePrevPage = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        onClick={handlePrevPage}
        disabled={page === 0}
        className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
      >
        Zurück
      </button>
      <button
        onClick={handleNextPage}
        disabled={!hasMore}
        className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
      >
        Weiter
      </button>
    </div>
  );
};