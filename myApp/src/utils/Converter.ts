import { CurrencyConverterInterface } from "../interfaces/ConverterInterface";

export class CurrencyConverter implements CurrencyConverterInterface {
  static cfhEuroRate: number = 0.94;
  convertEurToChf(euro: number): string {
    const chf = (euro * CurrencyConverter.cfhEuroRate).toFixed(2);
    return chf;
  }
  convertChfToEuro(chf: number): string {
    const euro = (chf / CurrencyConverter.cfhEuroRate).toFixed(2);
    return euro;
  }
}