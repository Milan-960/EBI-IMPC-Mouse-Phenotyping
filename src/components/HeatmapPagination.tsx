import React from "react";
import { Pagination } from "react-bootstrap";
import { HeatmapPaginationProps } from "../types/custom-types";

const HeatmapPagination: React.FC<HeatmapPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const visiblePages = 4;
  const startPageIndex = Math.max(
    0,
    currentPage - Math.floor(visiblePages / 2)
  );

  return (
    <>
      {totalPages > 1 && (
        <div className="text-center">
          <div className="pagination-container">
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(0)} />
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              />
              {startPageIndex > 0 && <Pagination.Ellipsis />}
              {Array.from({ length: visiblePages }, (_, index) => {
                const pageIndex = startPageIndex + index;
                if (pageIndex < totalPages) {
                  return (
                    <Pagination.Item
                      key={index}
                      active={pageIndex === currentPage}
                      onClick={() => handlePageChange(pageIndex)}
                    >
                      {pageIndex + 1}
                    </Pagination.Item>
                  );
                } else {
                  return null;
                }
              })}
              {startPageIndex + visiblePages < totalPages && (
                <Pagination.Ellipsis />
              )}
              <Pagination.Next
                onClick={() =>
                  handlePageChange(Math.min(totalPages - 1, currentPage + 1))
                }
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages - 1)}
              />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default HeatmapPagination;
