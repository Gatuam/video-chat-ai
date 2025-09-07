import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  pages: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ pages, totalPages, onPageChange }: Props) => {
  return (
    <div className=" flex items-center justify-between">
      <div className=" flex-1 text-sm">
        Page {pages} of {totalPages || 1}
      </div>
      <div className=" flex items-center justify-end space-x-2 px-4">
        <Button
          size={"sm"}
          disabled={pages === 1}
          onClick={() => onPageChange(Math.max(1, pages - 1))}
          className=""
        >
          Previous
        </Button>
        <Button
          size={"sm"}
          onClick={() => onPageChange(Math.min(totalPages, pages + 1))}
          disabled={pages === totalPages || totalPages === 0}
        >
          next
        </Button>
      </div>
    </div>
  );
};
