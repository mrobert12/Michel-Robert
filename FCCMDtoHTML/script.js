const markdown = document.getElementById("markdown-input");
const rawHTML = document.getElementById("html-output");
const preview = document.getElementById("preview");
let input = "";
markdown.addEventListener("input",()=>{
  convertMarkdown();
})

function convertMarkdown(){
  const input = markdown.value;
  const split = input.split('\n');
  let text = "";
  for(const s of split){
    preview.innerHTML = "";
    if(/^#{1}(?!#)/m.test(s)){
      console.log(s);
      text += toHeader(s.replace(/#\s+/,""),1);
    }else if(/^#{2}(?!#)/m.test(s)){
      text+=  toHeader(s.replace(/#{2}\s+/,""),2);
    }else if(/^#{3}(?!#)/m.test(s)){
      text += toHeader(s.replace(/#{3}\s+/,""),3);
    }else if(/^(\*\*|__).*\1$/.test(s)){
      text += toBold(s.replaceAll(/[\*\*]|[\_\_]/g,"").trim(),preview);
    }else if(/^(\*|_).*\1$/.test(s)){
      text += toItalic(s.replaceAll(/[\*|\_]/g,"").trim(),preview);
    }else if(/^(!\[)/.test(s)){
      text += toImage(s.replace(/!/,"").trim());
    }else if(/^\[/.test(s)){
      text += toLink(s);
    }else if(/^>/.test(s)){
      text += toQuote(s.replace(/>/,"").trim());
    }else{
      text += `${input}`;     
    }
  }
  preview.innerHTML = `${text}`;
  rawHTML.innerText = `${text}`;
  return text;
}



function toHeader(string,num){
  let text = "";
  const newElement = document.createElement(`h${num}`);
  preview.appendChild(newElement);
  if(/^[a-zA-Z0-9]/.test(string)){
    newElement.innerHTML = string;
    text += `<h${num}>${string}</h${num}>`;
  }else if(/^(\*\*|__).*\1$/.test(string)){
    const temp = toBold(string.replaceAll(/[\*\*]|[\_\_]/g,"").trim(),newElement);
    text += `<h${num}>${temp}</h${num}>`;
  }else if(/^(\*|_).*\1$/.test(string)){
    const temp = toItalic(string.replaceAll(/[\*|\_]/g,"").trim(),newElement);
    text += `<h${num}>${temp}</h${num}>`;
  }else{
    preview.innerHTML = `${text}`;
    return `<h${num}>${string}</h${num}>`;
  }
  return text;
}

function toItalic(string,element){
  const newElement = document.createElement("em");
  newElement.innerHTML = string;
  element.appendChild(newElement);
  return `<em>${string}</em>`;
}


function toBold(string,element){
  const newStrong = document.createElement("strong");
  if(/(\*).*\1$/.test(string)){
    let start = string.indexOf("*") + 1;
    let end = string.indexOf("*",start);
    const temp = string.substring(0,start-1) + toItalic(string.substring(start,end),newStrong);
    newStrong.innerHTML = temp;
    element.appendChild(newStrong);
    return `<strong>${temp}</strong>`
  }
  newStrong.innerHTML = string;
  element.appendChild(newStrong);
  return `<strong>${string}</strong>`;
}

function toImage(string){
  let start = string.indexOf("[");
  let end = string.indexOf("]");
  const altText = string.substring(start + 1,end);
  start = string.indexOf("(");
  end = string.indexOf(")");
  const imgSource = string.substring(start+1,end);
  const newImg = document.createElement("img");
  newImg.alt = altText;
  newImg.src = imgSource;
  preview.appendChild(newImg);
  return `<img alt="${altText}" src="${imgSource}">`;
}

function toLink(string){
  let start = string.indexOf("[");
  let end = string.indexOf("]");
  const linkText = string.substring(start+1,end);
  start = string.indexOf("(");
  end = string.indexOf(")");
  const url = string.substring(start+1,end);
  const newURL = document.createElement("a");
  newURL.innerText = linkText;
  newURL.href = url;
  preview.appendChild(newURL);
  return `<a href="${url}">${linkText}</a>`;
}

function toQuote(string){
  const newQuote = document.createElement("blockquote");
  if(/^(\*\*).*\1$/.test(string)){
    string = toBold(string.replaceAll(/\*\*/g,"").trim(),newQuote);
  }
  newQuote.innerHTML = string;
  preview.appendChild(newQuote);
  return `<blockquote>${string}</blockquote>`;
}