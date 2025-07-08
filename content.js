window.addEventListener("load", function () {

  const box = document.createElement("div");
  box.innerText = "✅ Walmart SmartCompanion is active!";
  box.id = "smartbuddy-box";

  document.body.appendChild(box);
  setTimeout(() => {
    box.style.display = "none"; 
  }, 3000);

  /*setTimeout(() => {
    const review = extract_reviews();

    summarizeReviews(review, function(err, summary){
      if (err){
        console.error("Failed to summarize!",err);
        return;
      }
       const summaryBox = document.createElement("div");
      summaryBox.style.background = "#fff8dc";
      summaryBox.style.padding = "12px";
      summaryBox.style.marginTop = "20px";
      summaryBox.style.border = "1px solid #ccc";
      summaryBox.style.borderRadius = "8px";
      summaryBox.style.maxWidth = "600px";
      summaryBox.style.boxShadow = "0 0 8px rgba(0,0,0,0.1)";
      summaryBox.innerHTML = `<b>📝 Review Summary:</b><br>${summary}`;

    
      const reviewSection = document.querySelector("#item-review-section");
      if (reviewSection) {
        reviewSection.prepend(summaryBox);
      } else {
        document.body.appendChild(summaryBox);
      }
    });
  }, 10000);
*/
});
