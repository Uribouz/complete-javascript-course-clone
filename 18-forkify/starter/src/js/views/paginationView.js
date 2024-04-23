import View from './View.js';
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _generateMarkup() {
        const currentPage = this._data.page;
        console.log(this._data);
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        // Page 1, and there are NO other pages
        if (currentPage === 1 && numPages <= 1) {
            return ``;
        }
        // Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return`
                <button class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // Last page, no next page.
        if (currentPage === numPages) {
            return`
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage-1}</span>
                </button>
            `;
        }
        
        // Page others, and there are next pages
        return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }
}

export default new PaginationView();