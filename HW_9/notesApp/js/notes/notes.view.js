class NotesView {
  constructor() {
    this._mainSelector = {
      list: document.querySelector('.c-main__list'),
      removeBtnClass: 'c-main__btn--remove',
      favoriteBtnClass: 'c-main__btn--favorite'
    }

    this._favoriteSelector = {
      list: document.querySelector('.c-favorite__list')
    }

    this._template = {
      mainItem: `
            <li class="c-main__element">
                {{note}}    
                <button data-id={{id}} class="c-main__btn--remove">Remove</button>
                <button data-id={{id}} class="c-main__btn--favorite" style="background-color: {{btn-color}}; border-radius: 50%">+</button>
            </li>
            `,
      favoriteItem: `
            <li class="c-favorite__element">
                {{note}}    
            </li>
            `
    }
  }

  renderNotes(notes) {
    let list_element = '';
    let favoriteColor = '';

    notes.forEach(note => {
      favoriteColor = note.isFavorite ? 'gold' : 'none';
      list_element += this._template.mainItem
        .replace('{{note}}', note.text)
        .replace(/{{id}}/g, note.id)
        .replace('{{btn-color}}', favoriteColor);
    });
    this._mainSelector.list.innerHTML = list_element;

    list_element = '';
    notes.forEach(note => {
      if (note.isFavorite) {
        list_element += this._template.favoriteItem.replace('{{note}}', note.text);
      }
    });

    this._favoriteSelector.list.innerHTML = list_element;
  }

  listenRemovingNote(cb) {
    this._mainSelector.list.addEventListener('click', (e) => {
      let target = e.target;
      if (target.className === this._mainSelector.removeBtnClass) {
        for (const attr of target.attributes) {
          if (attr.name === 'data-id') cb(attr.value);
        }
      }
    });
  }

  listenAddingFavoriteNote(cb) {
    this._mainSelector.list.addEventListener('click', (e) => {
      let target = e.target;
      if (target.className === this._mainSelector.favoriteBtnClass) {
        for (const attr of target.attributes) {
          if (attr.name === 'data-id') cb(attr.value);
        }
      }
    });
  }
}