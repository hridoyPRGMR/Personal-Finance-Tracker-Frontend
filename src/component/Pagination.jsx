import React from 'react';

export default function Pagination({ currentPage, totalPage, onPageChange }) {

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className='pagination justify-content-end'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button 
                            onClick={() => handlePageClick(number)} 
                            className='page-link'
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
