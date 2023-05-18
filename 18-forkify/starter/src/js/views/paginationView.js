import View from "./views";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkupNext(curPage) {
        return `          
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>`
    }

    _generateMarkupPrev(curPage) {        
        return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1 }</span>
        </button>`      
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);

        // Page 1,and there are other pages
        if(curPage === 1 && numPages > 1) {
            return this._generateMarkupNext(curPage);
        }
               
        // Last page
        if(curPage === numPages && numPages > 1) {
            return this._generateMarkupPrev(curPage);
        }
        
        // Other page
        if(curPage < numPages) {
            const markup = `${this._generateMarkupPrev(curPage)} ${this._generateMarkupNext(curPage)}`
            return markup;          
        }
        
        // Page 1,and there are no other pages
        return ''
    }   
}

export default new PaginationView();