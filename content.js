window.addEventListener("load", function () {
  const box = document.createElement("div");
  box.innerText = "✅ Walmart SmartCompanion is active!";
  box.id = "smartbuddy-box";
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);

});
