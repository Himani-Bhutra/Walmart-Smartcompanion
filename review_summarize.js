function getProductId() {
    const match = window.location.pathname.match(/\/ip\/[^\/]+\/(\d+)/);
    return match ? match[1] : null;
}

function extract_reviews () {
    // Adding the class and Id of the individual review div block
    const reviewDivs = document.querySelectorAll('#item-review-section .flex.flex-column.items-start.self-stretch.f6');
    let reviews = [];
    reviewDivs.forEach(div => {
        const text = div.innerText.trim();
        reviews.push(text);
    });

    // Returning  500 reviews 
    return reviews.slice(0,500).join('\n');

}

function summarizeReviews(reviewText, callback) {
  fetch("http://localhost:5000/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: reviewText })
  })
  .then(response => response.json())
  .then(data => callback(null, data.Summary))
  .catch(err => callback(err, null));
}
