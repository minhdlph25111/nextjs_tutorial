'use client';
import React from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {ChevronsLeft, ChevronsRight} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (value: number) => void;
    className?: string;
}

const PaginationCustom: React.FC<PaginationProps> = ({
                                                         currentPage,
                                                         totalItems,
                                                         itemsPerPage,
                                                         totalPages,
                                                         onPageChange,
                                                         onItemsPerPageChange,
                                                         className = ""
                                                     }) => {
    const goToFirstPage = () => onPageChange(1);
    const goToLastPage = () => onPageChange(totalPages);
    const goToNextPage = () => onPageChange(currentPage + 1);
    const goToPreviousPage = () => onPageChange(currentPage - 1);

    const handleItemsPerPageChange = (value: string) => {
        onItemsPerPageChange(Number(value));
        onPageChange(1);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (totalItems === 0) return null;

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex mt-4 justify-between gap-4 ${className}`}>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                    value={itemsPerPage.toString()}
                    onValueChange={handleItemsPerPageChange}
                >
                    <SelectTrigger className="w-32 h-8">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="5"> 5 / Page</SelectItem>
                            <SelectItem value="10">10 / Page</SelectItem>
                            <SelectItem value="20">20 / Page</SelectItem>
                            <SelectItem value="50">50 / Page</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex items-center gap-2'>
                <Pagination>
                    <PaginationContent>
                        {/* First page button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToFirstPage}
                                disabled={currentPage === 1}
                                className="h-8 w-8"
                                title="First page"
                            >
                                <ChevronsLeft className="h-4 w-4"/>
                            </Button>
                        </PaginationItem>

                        {/* Previous page button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="h-8 w-24"
                                title="Previous page"
                            >
                                <PaginationPrevious className="h-4 w-4"/>
                            </Button>
                        </PaginationItem>

                        {/* Page numbers */}
                        {pageNumbers.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(page);
                                    }}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Ellipsis for skipped pages */}
                        {pageNumbers[pageNumbers.length - 1] < totalPages && (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="h-8 w-24"
                                title="Next page"
                            >
                                <PaginationNext className="h-4 w-4"/>
                            </Button>
                        </PaginationItem>

                        {/* Last page button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToLastPage}
                                disabled={currentPage === totalPages}
                                className="h-8 w-8"
                                title="Last page"
                            >
                                <ChevronsRight className="h-4 w-4"/>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default PaginationCustom;