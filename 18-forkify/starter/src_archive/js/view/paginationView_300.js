import View from './View.js';
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            // * We need to search for the closest elemtn to the button itself. (in case we didn't click on the button directly)
            const btn = e.target.closest('.btn--inline')
            if (!btn) return;

            // * We need convert the value from user interface to interger.
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        });
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        console.log('currentPage', currentPage)
        // console.log(this._data);
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);
        // Page 1, and there are NO other pages
        if (currentPage === 1 && numPages <= 1) {
            return ``;
        }
        // Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return`
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // Last page, no next page.
        if (currentPage === numPages) {
            return`
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
        }
        
        // Page others, and there are next pages
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }
}

export default new PaginationView();