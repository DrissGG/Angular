//test = 12;
/* test = 12; */

let test: string = "Hello";

function hello(text: string): string {
  return `${test} ${text} `;
}

console.log(hello("Bob"));

let contact: [string, number | string, boolean] = ["Bob", "qsdf", false];

let i: number = 4;
i = 58;

type Point = {
  x: number;
  y: number;
};
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });