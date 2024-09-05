let value: string | number;
if (typeof value === "string") {
  // TypeScript knows that value is a string here
  console.log(value.toUpperCase()); // OK
} else {
  // TypeScript knows that value is a number here
  console.log(value.toFixed(2)); // OK
}
