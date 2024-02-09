
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    category: string;
}

export default function Pagination({currentPage, totalPages, category}: PaginationProps) {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 5));
    const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4))

    const numberedPageItems:JSX.Element[]= [];

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(
            <Link href={`?page=${page}&category=${category}`} key={page} className={`${page === currentPage ? "text-gray-500 bg-gray-300" : "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "} flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
                {page}
            </Link>
        )
    }
  return (
    <div className={"flex justify-center mt-8 "}>
        <nav aria-label="Page navigation example" >
            <ul className="inline-flex -space-x-px text-sm">
                {numberedPageItems}
            </ul>
        </nav>
    </div>
  )
}