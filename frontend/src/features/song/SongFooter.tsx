import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Table from '../../ui/Table';
import { useSongTable } from './SongTableContext';

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? 'var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function SongFooter() {
  const { table } = useSongTable();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const pageSize = table?.getState().pagination.pageSize;
  const pageCount = table?.getPageCount();

  useEffect(() => {
    table?.setPageIndex(currentPage - 1);
  }, [currentPage, table]);

  function nextPage() {
    if (!pageCount) return;

    if (currentPage < pageCount) {
      table?.nextPage();
    }

    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', `${next}`);
    setSearchParams(searchParams);
  }

  function prevPage() {
    if (currentPage > 0) {
      table?.previousPage();
    }

    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', `${prev}`);
    setSearchParams(searchParams);
  }

  if (pageCount == null || pageCount <= 1) return null;

  return (
    <Table.Footer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: '10px' }}>
          {pageSize == null ? null : (
            <span>
              Page {currentPage} of {pageCount}
            </span>
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            {'<'}
          </PaginationButton>
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            {'>'}
          </PaginationButton>
        </div>
      </div>
    </Table.Footer>
  );
}

export default SongFooter;
