"use strict";
document.querySelectorAll(".search").forEach(function (input) {
  input.addEventListener("input", function () {
    const section = input.closest("main");
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    const cards = section.querySelectorAll(".digest");
    cards.forEach(function (card) {
      const matches = card.textContent.toLocaleLowerCase().includes(query);
      card.classList.toggle("hidden", !matches);
      if (matches) visible += 1;
    });
    section.querySelector(".match-count").textContent = visible + " / " + cards.length;
  });
});
