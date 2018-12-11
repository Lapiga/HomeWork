class App {
  constructor() {
    let model = new NotesModel();
    let view = new NotesView();
    let ctrl = new NotesController(model, view);

    ctrl.init();
  }
}

let app = new App();
