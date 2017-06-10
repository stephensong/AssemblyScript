let globalArr: uint[] = new Array(10);

export function main(): uint {
  let arr: uint[] = new Array(10);
  arr[0] = 1;
  // return arr[1];
  globalArr[0] = 123;
  return globalArr[1];
}
