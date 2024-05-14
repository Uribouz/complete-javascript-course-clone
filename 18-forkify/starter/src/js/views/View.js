import icons from 'url:../../img/icons.svg' //Parcel 2

export default class View {
    _data
    clear() {
        this._parentElement.innerHTML = '';
    }

    //* How to write document: Refer to this link
    //* https://jsdoc.app/

    /**
     * Render the received object to the DOM
     * @param {Object | Object []} data The data to be rendered (e.g. recipe)
     * @param {bolean} [render=true] If false, create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author Ball Opas
     * @todo Finish implementation
     */
    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
      if (!data || (Array.isArray(data) && data.length === 0)) return;

      this._data = data;
      const newMarkup = this._generateMarkup();
      const newDom = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDom.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      // console.log(curElements);
      // console.log(newElements);

      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

        //Update changed text
        if (!newEl.isEqualNode(curEl) && 
        newEl.firstChild?.nodeValue.trim() !== '') {
          // console.log('💩',newEl.firstChild?.nodeValue.trim());
          curEl.textContent = newEl.textContent;
        }
        //Update changed attributed
        if (!newEl.isEqualNode(curEl)) {
          // console.log('curEl:', curEl);
          // console.log('newEl:', newEl);
          Array.from(newEl.attributes).forEach(attr => {
            curEl.setAttribute(attr.name, attr.value);
          })
          // curEl.textContent = newEl.textContent;
        }
      })
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `
      this.clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `
      this.clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}