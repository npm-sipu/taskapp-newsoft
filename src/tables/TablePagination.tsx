import { Text } from "@/components/Common/Text";

import { MAX_PAGE_SIZE } from "@/utils/contsants";

interface TablePaginationProps {
  pageNumber: number;
  totalRecord: number;
  canNextPage: boolean;
  canPrevPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

function TablePagination(props: TablePaginationProps) {
  const {
    pageNumber,
    totalRecord,
    canNextPage,
    canPrevPage,
    onNextPage,
    onPreviousPage,
  } = props;

  const startRecord = pageNumber * MAX_PAGE_SIZE + 1;
  const endRecord =
    totalRecord > MAX_PAGE_SIZE
      ? startRecord + MAX_PAGE_SIZE > totalRecord
        ? totalRecord
        : (pageNumber + 1) * MAX_PAGE_SIZE
      : totalRecord;

  return (
    <div className='mt-4 flex w-full justify-between sm:items-center py-6 md:px-6 px-4 gap-3 max-sm:flex-col'>
      <div>
        {totalRecord > 0 ? (
          <Text>
            Show records {startRecord} - {endRecord} from {totalRecord}
          </Text>
        ) : (
          <Text>No Records</Text>
        )}
      </div>
      <div className='flex gap-5 max-sm:justify-between max-sm:w-full'>
        <button type='button' onClick={onPreviousPage} disabled={canPrevPage}>
          <Text
            className={`${
              canPrevPage ? "cursor-not-allowed text-lightgrey" : ""
            }`}
          >
            Previous
          </Text>
        </button>
        <button type='button' onClick={onNextPage} disabled={canNextPage}>
          <Text
            className={`${
              canNextPage ? "cursor-not-allowed text-lightgrey" : ""
            }`}
          >
            Next
          </Text>
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
