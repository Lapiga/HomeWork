class NotesController {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  init() {
    this._model.getData((data) => {
      this._view.renderNotes(data);
    });
    this.listeners();
  }

  listeners() {
    this._view.listenRemovingNote((id) => {
      this._model.removeNote(id, (notes) => {
        this._view.renderNotes(notes);
      });
    });

    this._view.listenAddingFavoriteNote((id) => {
      this._model.addFavoriteNote(id, (notes) => {
        this._view.renderNotes(notes);
      })
    });
  }

}