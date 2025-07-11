//Walmart Smart Companion loading window
window.addEventListener("load", function () {

  const box = document.createElement("div");
  box.innerText = "✅ Walmart SmartCompanion is active!";
  box.id = "smartbuddy-box";

  document.body.appendChild(box);
  setTimeout(() => {
    box.style.display = "none"; 
  }, 3000);


  //Review summary box 

  const product_id = getProductId();
  if(!product_id) return ;

  const review_page_url = `https://www.walmart.com/reviews/product/${product_id}?entryPoint=viewAllReviewsTop`;

  setTimeout(() => {
    chrome.runtime.sendMessage({ type: "FETCH_REVIEWS_PAGE", url: review_page_url }, (response) => {
      if (response && response.html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.html, "text/html");
      
        const review = extract_reviews_from_html(doc);

        summarizeReviews(review, function(err, summary){
          if (err){
            console.error("Failed to summarize!",err);
            return;
          }
          const summaryBox = document.createElement("div");
          summaryBox.id = "summary_box-box"
          summaryBox.innerHTML = `<b>📝 Review Summary:</b><br>${summary}`;
          const reviewSection = document.querySelector("#item-review-section");
          if (reviewSection) {
           reviewSection.prepend(summaryBox);
          }  else {
            document.body.appendChild(summaryBox);
          }
        });
      }
    }
  )}, 10000);

});

/*

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
      summaryBox.id = "summary_box-box"
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
*/