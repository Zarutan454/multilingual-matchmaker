interface ProfilePaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
}

export const ProfilePagination = ({ page, setPage, hasMore }: ProfilePaginationProps) => {
  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        onClick={() => setPage(p => Math.max(0, p - 1))}
        disabled={page === 0}
        className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
      >
        Zurück
      </button>
      <button
        onClick={() => setPage(p => p + 1)}
        disabled={!hasMore}
        className="px-4 py-2 bg-[#9b87f5] text-white rounded disabled:opacity-50"
      >
        Weiter
      </button>
    </div>
  );
};