import ReactPaginate from "react-paginate";

interface Props {
  page: any;
  perPage: number;
  setCurrentPage: any;
}

export default function Pagination({ page, perPage, setCurrentPage }: Props) {
  return (
    <ReactPaginate
      pageCount={Math.ceil(page?.length / perPage)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => setCurrentPage(selected)}
      containerClassName="flex justify-center py-2 px-4 rounded-lg bg-white shadow-md"
      pageClassName="mx-2"
      pageLinkClassName="py-2 px-4 rounded-full"
      activeClassName="bg-[#0083CA] rounded-full text-white"
      previousClassName="mr-2"
      nextClassName="ml-2"
      previousLinkClassName=""
      nextLinkClassName=""
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}