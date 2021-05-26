export class Grid {
  constructor(options) {
    this.rootId = options.rootId;
    this.noOfRows = options.noOfRows;
    this.noOfCells = options.noOfCells;
    this.rowClass = options.rowClass;
    this.cellClass = options.cellClass;
    this.gridContainer = document.getElementById(this.rootId);
    this.cells = [];
    this.newOperation = false;
    this.values = [
      "1",
      "2",
      "3",
      "*",
      "4",
      "5",
      "6",
      "/",
      "7",
      "8",
      "9",
      "+",
      ".",
      "0",
      "C",
      "-",
    ];
  }

  init() {
    this.draw();
  }

  draw() {
    this.addResultContainer();
    for (let i = 0; i < this.noOfRows; i++) {
      const row = document.createElement("div");
      row.classList.add(this.rowClass);
      this.addCellsToRow(row, i);
      this.gridContainer.append(row);
    }
    this.addResultBtn();
  }

  addResultBtn() {
    const restultBtn = document.createElement("div");
    restultBtn.classList.add("result-btn");
    restultBtn.innerText = "=";

    restultBtn.addEventListener("click", () => {
      this.toggleCellState(restultBtn);
    });

    restultBtn.addEventListener("mouseenter", () => {
      this.toggleCellState(restultBtn);
    });

    this.cells.push(restultBtn);
    this.gridContainer.append(restultBtn);
  }

  addResultContainer() {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-format");
    resultContainer.id = "result-container";
    this.gridContainer.append(resultContainer);
  }

  toggleCellState(cell) {
    cell.classList.toggle("active");
    let display = document.getElementById("result-container");
    switch (cell.innerText) {
      case "C":
        display.innerText = "";
        break;
      case "=":
        try {
          display.innerText =
            eval(display.innerText) === undefined
              ? ""
              : eval(display.innerText).toFixed(2);
          if (display.innerText.split(".")[1] === "00") {
            display.innerText = display.innerText.split(".")[0];
          }
          this.newOperation = true;
        } catch {
          display.innerText = "Invalid expression!";
        }
        break;
      default:
        if (isNaN(cell.innerText)) {
          this.newOperation = false;
        } else {
          if (this.newOperation) {
            display.innerText = "";
            this.newOperation = false;
          }
        }

        display.innerText += cell.innerText;
    }
    setTimeout(() => {
      cell.classList.toggle("active");
    }, 200);
  }

  addCellsToRow(row, i) {
    for (let j = 0; j < this.noOfCells; j++) {
      const cell = document.createElement("div");
      cell.innerText = this.values[i + 3 * i + j];
      cell.classList.add(this.cellClass);

      cell.addEventListener("click", () => {
        this.toggleCellState(cell);
      });
      this.cells.push(cell);
      row.append(cell);
    }
  }
}
