import "./scss/index.scss";
import { CurrencyConverter } from "./utils/Converter";

const form = document.getElementById("form") as HTMLFormElement;
const inputEur = document.getElementById("eur") as HTMLInputElement;
const inputChf = <HTMLInputElement>document.getElementById("chf");

// Instanciation de CurrencyConverter
const cc = new CurrencyConverter();

form.onsubmit = (e: Event) => {
  e.preventDefault();
};

inputEur.oninput = function () {
  console.log(`inputEur.value`, inputEur.value);
  inputChf.value = cc.convertEurToChf(parseFloat(inputEur.value));
};

inputChf.addEventListener("input", function () {
  console.log(`inputChf.value`, inputChf.value);
  inputEur.value = cc.convertChfToEuro(parseFloat(inputChf.value));
});