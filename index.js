let myleads = [];

const inputel = document.getElementById("input-el");
const ulel = document.getElementById("ul-el");
const inputbtn = document.getElementById("input-btn");
const deletebtn = document.getElementById("delete-btn");
const leadfromstorage = JSON.parse(localStorage.getItem("myleads"));
let tabbtn = document.getElementById("tab-btn");

deletebtn.addEventListener("dblclick", function () {
  // to clear local storage my leads and dom
  localStorage.clear();
  myleads = [];
  render(myleads);
});

if (leadfromstorage) {
  myleads = leadfromstorage;
  render(myleads);
}

tabbtn.addEventListener("click", function () {
  //grabing the url of current tab
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {})
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads);
  });
  //saving with tab btn
});


function render(leads) {
  let listitems = "";

  for (let i = 0; i < leads.length; i++) {
    // redning out input lead using textContent
    // href and target for clickable and opening in new tab
    // listitems += "<li><a href='"+ myleads[i] + "' target='_blank'>" + myleads[i] + "</a></li>";
    // template strings
    listitems += `<li>
                      <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
                   </li>`;
  }
  ulel.innerHTML = listitems;
  // Clear the value of the input field
  inputel.value = "";
}

inputbtn.addEventListener("click", function () {
  myleads.push(inputel.value);
  // Clear the value of the input field
  inputel.value = "";
  //saving leads to local storage
  localStorage.setItem("myleads", JSON.stringify(myleads));

  render(myleads);
  console.log(localStorage.getItem("myleads"));
}); 
