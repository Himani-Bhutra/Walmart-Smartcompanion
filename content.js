window.addEventListener("load", function () {

  const box = document.createElement("div");
  box.innerText = "✅ Walmart SmartCompanion is active!";
  box.id = "smartbuddy-box";

  document.body.appendChild(box);
  setTimeout(() => {
    box.style.display = "none"; 
  }, 3000);

  setTimeout(() => {
    const review = extract_reviews();

    summarizeReviews(review, function(err, summary){
      if (err){
        console.error("Failed to summarize!",err);
        return;
      }
      const summaryBox = document.createElement("div");
      summaryBox.id = "summary_box"
      summaryBox.innerHTML = `<b>📝 Review Summary:</b><br>${summary}`;
      const reviewSection = document.querySelector("#item-review-section");
      if (reviewSection) {
        reviewSection.prepend(summaryBox);
      } else {
        document.body.appendChild(summaryBox);
      }
    });
  }, 10000);
});
