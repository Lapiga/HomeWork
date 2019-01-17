class Cell {
  constructor(row, column) {
    this._row = row;
    this._column = column;
    this._isMined = false;
    this._isOpend = false;
  }

  setMine(isMined) {
    this._isMined = isMined;
  }

  isMined() {
    return this._isMined;
  }

  open(isOpend) {
    this._isOpend = isOpend;
  }

  isOpend() {
    return this._isOpend;
  }
}


class Field {
  constructor(rowCount, columnCount, level) {
    this._rowCount = rowCount;
    this._columnCount = columnCount;
    this._allCells = new Array(this._rowCount);
    this._minedCoef = level / 10;
    this._minedCellCount = 0;
  }

  init() {
    for (let i = 0; i < this._rowCount; i++) {
      this._allCells[i] = new Array(this._columnCount);
      for (let j = 0; j < this._columnCount; j++) {
        this._allCells[i][j] = new Cell(i, j);
      }
    }

    this.setMinedCells();
  }

  getAdjacentMinedCellCount(row, column) {
    row = +row;
    column = +column;

    let count = 0;
    let rowStart = ((row - 1) < 0) ? 0 : row - 1;
    let rowEnd = ((row + 1) > this._rowCount - 1) ? this._rowCount - 1 : row + 1;
    let columnStart = ((column - 1) < 0) ? 0 : column - 1;
    let columnEnd = ((column + 1) > this._columnCount - 1) ? this._columnCount - 1 : column + 1;

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = columnStart; j <= columnEnd; j++) {
        if (this._allCells[i][j].isMined()) {
          count++;
        }
      }
    }
    return count;
  }

  setMinedCells() {
    let mRow = 0;
    let mColumn = 0;

    for (let i = 0; i < Math.ceil(this._rowCount * this._columnCount * this._minedCoef); i++) {
      mRow = Math.floor(Math.random() * (this._rowCount - 1)) + 1;
      mColumn = Math.floor(Math.random() * (this._columnCount - 1)) + 1;

      if (this._allCells[mRow][mColumn].isMined()) {
        i--;
      } else {
        this._allCells[mRow][mColumn].setMine(true);
        this._minedCellCount++;
      }
    }
  }

  getAllCells() {
    return this._allCells;
  }

  getMinedCellCount() {
    return this._minedCellCount;
  }

  getAllCellCount() {
    return (this._rowCount * this._columnCount);
  }
}


class AppMinerGame {
  constructor() { }

  init() {
    let main = this;
    let isCorrectData = true;

    $('.c-header').on('focusout', function (e) {
      isCorrectData = true;
      if (e.target.name === 'field-width') {
        let width = +$('[name="field-width"]').val();
        if ((width < 4) || (width > 20)) {
          alert('Wrong width of play field!');
          isCorrectData = false;
        }
      } else if (e.target.name === 'field-height') {
        let height = +$('[name="field-height"]').val();
        if ((height < 4) || (height > 20)) {
          alert('Wrong height of play field!');
          isCorrectData = false;
        }
      } else if (e.target.name === 'difficulty-level') {
        let level = +$('[name="difficulty-level"]').val();
        if ((level < 1) || (level > 5)) {
          alert('Wrong difficulty level!');
          isCorrectData = false;
        }
      }
    });

    $('.c-btn-start').on('click', function () {
      if (isCorrectData) {
        $('div.c-field').empty();
        $('.c-btn-start').text('Restart game');

        main._field = new Field($('[name="field-width"]').val(),
          $('[name="field-height"]').val(),
          $('[name="difficulty-level"]').val());
        main._field.init();
        main._cells = main._field.getAllCells();

        $('.c-mined-cell-count').text('Mined cell count: ' + main._field.getMinedCellCount());
        $('.c-opend-cell-count').text('Opend cell count: ' + '0 / ' + main._field.getAllCellCount());

        main.renderCells();
        main.onClickCell();
      }
    });
  }

  renderCells() {
    for (let i = 0; i < this._cells.length; i++) {
      $('.c-field').append('<div name="row_' + i + '" class="c-field__row">');
      for (let j = 0; j < this._cells[i].length; j++) {
        $('[name="row_' + i + '"]').append('<div name="cell_' + i + ';' + j + '" class="c-field__cell">');

        // For debug
        //if (this._cells[i][j].isMined()) {
        //  $('[name="cell_' + i + ';' + j + '"]').css('background-color', 'gold');
        //}
      }
    }
  }

  openAdjacentCells(row, column) {
    row = +row;
    column = +column;

    let res = 0;
    let count = 0;
    let rowStart = ((row - 1) < 0) ? 0 : row - 1;
    let rowEnd = ((row + 1) > this._cells.length - 1) ? this._cells.length - 1 : row + 1;
    let columnStart = ((column - 1) < 0) ? 0 : column - 1;
    let columnEnd = ((column + 1) > this._cells[row].length - 1) ? this._cells[row].length - 1 : column + 1;

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = columnStart; j <= columnEnd; j++) {
        if (!this._cells[i][j].isOpend()) {
          count = this._field.getAdjacentMinedCellCount(i, j);
          console.log(count);

          if (count !== 0) {
            $('[name="cell_' + i + ';' + j + '"]').text(count);
          }
          $('[name="cell_' + i + ';' + j + '"]').addClass('c-field__cell--isOpend');
          this._cells[i][j].open(true);
          res++;
        }
      }
    }
    return res;
  }

  onClickCell() {
    let main = this;
    let freeCellCount = this._field.getAllCellCount() - this._field.getMinedCellCount();

    $('.c-field__cell').on('click', function () {
      let cellName = $(this).attr('name');
      let coordinates = cellName.substr(5).split(';');
      let row = coordinates[0];
      let column = coordinates[1];

      if (!main._cells[row][column].isOpend() && (freeCellCount !== 0)) {
        if (main._cells[row][column].isMined()) {
          $('[name="' + cellName + '"]').text('X');
          $('[name="' + cellName + '"]').addClass('c-field__cell--isMine');
          freeCellCount = 0;
          alert('You are loser!!!');
        }
        else {
          let count = main._field.getAdjacentMinedCellCount(row, column);
          if (count === 0) {
            freeCellCount -= main.openAdjacentCells(row, column);
          }
          else {
            main._cells[row][column].open(true);
            $('[name="' + cellName + '"]').text(count);
            $('[name="' + cellName + '"]').addClass('c-field__cell--isOpend');
            freeCellCount--;
          }

          $('.c-opend-cell-count').text('Opend cell count: ' + (main._field.getAllCellCount() - freeCellCount - main._field.getMinedCellCount()) + ' / ' + main._field.getAllCellCount());

          if (freeCellCount === 0) {
            alert('You are winner!!!');
          }
        }
      }
    });
  }
}

new AppMinerGame().init();