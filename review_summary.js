function extractReviews() {
  const reviewDivs = document.querySelectorAll('[data-testid="item-review-section"] .flex.flex-column.items-start.self-stretch.f6');
  let reviews = [];

  reviewDivs.forEach(div => {
    const text = div.innerText.trim();
    if (text.length > 30) {
      reviews.push(text);
    }
  });

  if (reviews.length === 0) {
    return null;
  }

  return reviews.slice(0, 5).join('\n\n'); 
}


function summarizeReviews(reviewText, callback) {
  fetch("http://localhost:5000/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: reviewText })
  })
    .then(response => response.json())
    .then(data => {
      if (data.summary) {
        callback(null, data.summary);
      } else {
        callback("No summary returned", null);
      }
    })
    .catch(err => {
      callback(err, null);
    });
}
