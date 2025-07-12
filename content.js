window.addEventListener("load", function () {
  const box = document.createElement("div");
  box.innerText = "✅ Walmart SmartCompanion is active!";
  box.id = "smartbuddy-box";
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);

  setTimeout(() => {
    const review = extractReviews(); 
    if (!review) {
      console.warn("No reviews found on this page.");
      return;
    }

    console.log("Extracted Reviews:", review);

    summarizeReviews(review, function(err, summary) {
      if (err) {
        console.error("Failed to summarize!", err);
        return;
      }

      const summaryBox = document.createElement("div");
      summaryBox.id = "summary_box-box";
      summaryBox.innerHTML = `<strong>📝 Review Summary:</strong><br>${summary}`;

      const reviewSection = document.querySelector("#item-review-section");
      if (reviewSection) {
        reviewSection.prepend(summaryBox);
      } else {
        document.body.appendChild(summaryBox);
      }
    });
  }, 10000); // waiting 10s for page load
});
