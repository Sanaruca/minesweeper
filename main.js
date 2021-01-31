let raws = 12,
  colums = 30,
  nBoms = 60,
  bomPositios = [];
let firstClick = false;
document.querySelector("main").appendChild(printTable());
const $td = document.querySelectorAll("td");

$td.forEach((element, index) => {
  element.id = index;
  element.onclick = () => {
    if (firstClick) {
      if (element.innerText === "0" && !element.hasAttribute("style")) {
        clickArround(element);
      }
      show(element);
      win();
    } else {
      firstClick = Number(element.id);
      randomizateBoms(bomPositios, nBoms);
      setNumbers();
      element.click();
    }
  };
  element.ondblclick = () => {
    clickArround(element);
  };
  element.onauxclick = () => {
    element.classList.toggle("flag");
    if (element.classList.contains("flag")) {
      element.onclick = false;
    } else {
      element.onclick = () => show(element);
    }
  };
});

function win() {
  for (let i = 0; i < bomPositios.length; i++) {
    const element = $td[bomPositios[i]];
    const elementsArround = clickArround(element, true);
    let index = -1;

    while (index < elementsArround.length) {
      index++;
      const j = elementsArround[index];
      // console.log("j: " + j, " !j: " + !j, "index: " + index, "i: " + i);
      if (!j) {
        continue;
      }
      if (!$td[j].hasAttribute("style") && !bomPositios.includes(j))
        return false;
    }
  }
  alert("You Win");
}

function randomizateBoms(array, to) {
  for (let i = 0; i < to; i++) {
    let mr = Math.floor(Math.random() * $td.length);
    if (
      !array.includes(mr) &&
      mr !== firstClick &&
      !clickArround($td[firstClick], true).includes(mr)
    ) {
      array.push(mr);
    } else {
      --i;
    }
  }
}

function setNumbers() {
  bomPositios.forEach((position) => {
    const emltBom = $td[position];
    emltBom.innerText = "";

    const left = emltBom.previousElementSibling;
    const right = emltBom.nextElementSibling;

    const top = $td[Number(emltBom.id - colums)];
    const bottom = $td[Number(emltBom.id) + colums];

    const top_left_corner = top ? top.previousElementSibling : undefined;
    const top_right_corner = top ? top.nextElementSibling : undefined;

    const bottom_left_corner = bottom
      ? bottom.previousElementSibling
      : undefined;
    const bottom_right_corner = bottom ? bottom.nextElementSibling : undefined;

    if (left && !bomPositios.includes(Number(left.id)))
      left.innerText = Number(left.innerText) + 1;
    if (right && !bomPositios.includes(Number(right.id)))
      right.innerText = Number(right.innerText) + 1;
    if (top && !bomPositios.includes(Number(top.id)))
      top.innerText = Number(top.innerText) + 1;
    if (bottom && !bomPositios.includes(Number(bottom.id)))
      bottom.innerText = Number(bottom.innerText) + 1;
    if (top_left_corner && !bomPositios.includes(Number(top_left_corner.id)))
      top_left_corner.innerText = Number(top_left_corner.innerText) + 1;
    if (top_right_corner && !bomPositios.includes(Number(top_right_corner.id)))
      top_right_corner.innerText = Number(top_right_corner.innerText) + 1;
    if (
      bottom_left_corner &&
      !bomPositios.includes(Number(bottom_left_corner.id))
    )
      bottom_left_corner.innerText = Number(bottom_left_corner.innerText) + 1;
    if (
      bottom_right_corner &&
      !bomPositios.includes(Number(bottom_right_corner.id))
    )
      bottom_right_corner.innerText = Number(bottom_right_corner.innerText) + 1;
  });
}

setNumbers();

function show(element) {
  if (!bomPositios.includes(Number(element.id))) {
    element.style.background = "transparent";
    switch (element.innerText) {
      case "1":
        element.style.color = "#92abc5";
        break;
      case "2":
        element.style.color = "#2374d8";
        break;
      case "3":
        element.style.color = "#c825e4";
        break;
      case "4":
        element.style.color = "#ff357a";
        break;
      case "5":
        element.style.color = "#e91c43";
        break;
      case "6":
        element.style.color = "blue";
        break;
      case "7":
        element.style.color = "blue";
        break;
      case "8":
        element.style.color = "blue";
        break;
      default:
        break;
    }
  } else {
    bomPositios.forEach((index, n) => {
      setTimeout(() => {
        $td[index].classList.add("bom");
      }, n * 50);
    });
    let tt = document.createElement("div");
    tt.className = "hola";
    tt.innerHTML =
      "<div class='lose-menu'>" + "<button onclick='location.reload()'>Try again</button>" + "</div>";
    document.body.prepend(tt);
  }
}

function clickArround(element, getID = false) {
  const left = element.previousElementSibling;
  const right = element.nextElementSibling;

  const top = $td[Number(element.id) - colums];
  const bottom = $td[Number(element.id) + colums];

  const top_left_corner = top ? top.previousElementSibling : undefined;
  const top_right_corner = top ? top.nextElementSibling : undefined;

  const bottom_left_corner = bottom ? bottom.previousElementSibling : undefined;
  const bottom_right_corner = bottom ? bottom.nextElementSibling : undefined;

  if (getID)
    return [
      left ? Number(left.id) : null,
      right ? Number(right.id) : null,
      top ? Number(top.id) : null,
      bottom ? Number(bottom.id) : null,
      top_left_corner ? Number(top_left_corner.id) : null,
      top_right_corner ? Number(top_right_corner.id) : null,
      bottom_left_corner ? Number(bottom_left_corner.id) : null,
      bottom_right_corner ? Number(bottom_right_corner.id) : null,
    ];

  if (left) left.click();
  if (right) right.click();
  if (top) top.click();
  if (bottom) bottom.click();
  if (top_left_corner) top_left_corner.click();
  if (top_right_corner) top_right_corner.click();
  if (bottom_left_corner) bottom_left_corner.click();
  if (bottom_right_corner) bottom_right_corner.click();
}

function printTable() {
  const elmtTable = document.createElement("table");
  elmtTable.innerHTML = `<tr>${"<td>0</td>".repeat(colums)}</tr>`.repeat(raws);
  return elmtTable;
}
