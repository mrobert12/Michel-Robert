const generateButton = document.getElementById("generate-btn");
const sortButton = document.getElementById("sort-btn");
let startingArr = document.getElementById("starting-array");
const arrayContainer = document.getElementById("array-container");

const generateElement = ()=>{
  return (Math.floor(Math.random() * (100)+1));
}

const generateArray = ()=>{
  let array = [];
  for(let i =0; i<5;i++){
    array.push(generateElement());
  }
  return array;
}

const generateContainer = ()=>{
  const newDiv = document.createElement("div");
  return newDiv;
}

const fillArrContainer = (element,array)=>{
  element.innerHTML = "";
  array.forEach((num)=>{
    const span = `<span>${Number(num)}</span>`;
    element.innerHTML += span;
  })
}

const isOrdered= (num1,num2) =>{
  return (num1 <= num2);
}

const swapElements = (arr,index) => {
  if(!isOrdered(arr[index],arr[index+1])){
    let temp = arr[index];
    arr[index] = arr[index+1];
    arr[index+1]= temp;
    return true;
  }
  return false;
}

const highlightCurrentEls= (element,index) =>{
  element.children[index].setAttribute("style","border: 1px dashed red");
  element.children[index+1].setAttribute("style","border: 1px dashed red");
}

function bubbleSort(arr){
  let isSwapped = false;
  for(let i = 0; i < arr.length -1;i++){
    highlightCurrentEls(arrayContainer.lastChild,i)
    if(!isSwapped){
      isSwapped = swapElements(arr,i);
    }else{
      swapElements(arr,i);
    }
    addDiv(arrayContainer,arr);
  }
  if(isSwapped){
    bubbleSort(arr);
  }
  arrayContainer.lastChild.setAttribute("style",'border:3px green solid');
  return arr;
}

const addDiv = (element,arr)=>{
  element.appendChild(generateContainer());
  fillArrContainer(element.lastChild,arr);
}

const getArray = () => {
  let arr = [];
  const children = startingArr.children;
  for(let i = 0; i < children.length;i++){
    arr.push(Number(children[i].innerText));
  }
  return arr;
}

const clearArrElement = ()=>{
  arrayContainer.innerHTML = `<div id="starting-array"></div>`;
  startingArr = document.getElementById("starting-array");
}
generateButton.addEventListener("click",()=>{
  clearArrElement();
  sortButton.style.display = "block";
  fillArrContainer(startingArr,generateArray());
  //fillArrContainer(startingArr,[40,8,7,91,81]);
  highlightCurrentEls(startingArr,0)
})
sortButton.addEventListener("click",()=>{
  const arr = getArray();
  if(arr){
    //bubbleSort([61,92,42,55,54]);
    bubbleSort(arr);
    sortButton.style.display = "none";
    
  }
})