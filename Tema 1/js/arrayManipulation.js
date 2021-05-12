function multiplyElementsVJS(data) {
  console.log("#### V1 ####");
  for (let i = 0; i < data.length; i++) {
    console.log(data[i] + data[i] * 15);
  }
}

function multiplyElements(data) {
  console.log("#### V2 ####");
  data.map((item) => console.log(item + item * 15));
}

function copyAndModifyArray(data) {
  let arrCopy = [];
  data.map((item) => {
    arrCopy = [...arrCopy, item * 10 + item];
  });
  console.log("Array-ul initial: " + data);
  console.log("Array-ul dupa destructuring: " + arrCopy);
}

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

multiplyElementsVJS(arr);
multiplyElements(arr);
copyAndModifyArray(arr);
