/* eslint-disable jsx-a11y/anchor-is-valid */
const Pagination = ({
  flag,
  paginate,
  handleNextButton,
  handlePreviousButton,
  handlePageNumberClick,
  pages,
}) => {
  return (
    <div
      className={
        flag === "bottom"
          ? "flex items-center justify-between border-b border-gray-200 bg-white pb-6 sm:px-6 sm:mt-6 sm:pt-6"
          : "flex items-center justify-between border-t border-gray-200 bg-white pt-3 sm:px-6 sm:mt-6 sm:pt-6"
      }
    >
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> {paginate?.skip + 1} </span>
            to
            <span className="font-medium">
              {" "}
              {paginate?.limit + paginate?.skip}{" "}
            </span>
            of
            <span className="font-medium"> {paginate?.total} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={handlePreviousButton}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {pages && pages?.length > 0
              ? pages.map((p, key) => {
                  return p === paginate?.page ? (
                    <button
                      key={`pagination_${key}`}
                      type="button"
                      onClick={() => handlePageNumberClick(p - 1)}
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {p}
                    </button>
                  ) : (
                    <button
                      key={`pagination_${key}`}
                      type="button"
                      onClick={() => handlePageNumberClick(p - 1)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      {p}
                    </button>
                  );
                })
              : null}

            <button
              type="button"
              onClick={handleNextButton}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
