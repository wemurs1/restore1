import ReactPaginate from 'react-paginate';
import { MetaData } from '../models/pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { pageSize, totalCount, totalPages, currentPage } = metaData;
  return (
    <div className='row'>
      <div className='col-4'>
        <p>
          Displaying {(currentPage - 1) * pageSize + 1}-
          {currentPage * pageSize > totalCount
            ? totalCount
            : currentPage * pageSize}{' '}
          of {totalCount} items
        </p>
      </div>
      <div className='col-8'>
        <div>
          <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={(event: any) => onPageChange(event.selected + 1)}
            pageRangeDisplayed={2}
            pageCount={totalPages!}
            previousLabel='< previous'
            renderOnZeroPageCount={null}
            className='react-paginate'
            forcePage={currentPage - 1}
          />
        </div>
      </div>
    </div>
  );
}
