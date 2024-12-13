import React from "react";

function Pagination({totalPages,currentPage,onPageChange}){

    const pages=[];
    
    for(let i=1; i<=totalPages; i++){
        pages.push(
            <li
                key={i}
                className={`page-item ${i === currentPage ? "active":""}`}
                onClick={() => onPageChange(i)}
                style={{cursor:"pointer"}}
            >   
                <span className="page-link">{i}</span>
            </li>
        );
    }

    return(
        <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
                <li 
                className={`page-item ${currentPage === 1 ? "disabled":""}`}
                onClick={()=>currentPage > 1 && onPageChange(currentPage-1)}
                style={{cursor: currentPage > 1 ? "pointer" : "not-allowed"}}
                >
                    <span className="page-link">Previous</span>
                </li>
                
                {pages}

                <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={()=>{
                    currentPage < totalPages && onPageChange(currentPage+1)
                }}
                style={{cursor: currentPage < totalPages ? "pointer" : ""}}
                >
                    <span className="page-link">Next</span>
                </li>

            </ul>
        </nav>
    )

}

export default Pagination;