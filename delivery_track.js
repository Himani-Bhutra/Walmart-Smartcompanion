let on_time = ['fast delivery','on time', 'early'];
let not_onTime = ['delayed', 'late'];
let stock = ['out of stock', 'not available','sold out','restock'];

let c1 = 0; // for on time or early delivery
let c2 = 0; // for late delivery
let c3 = 0; // out of stock

window.addEventListener("load", function () {
    console.log("deliveryTracker.js loaded");
    this.setTimeout(()=> { 
        const reviews = extract_reviews();
        //chnaging all the reviews to lower case to match the keywords
        const lower_text = reviews.toLowerCase();

        // on time or early delivery
        on_time.forEach(keyword => {
            if (lower_text.includes(keyword)) c1++;
        })
        //late delivery
        not_onTime.forEach(keyword => {
            if (lower_text.includes(keyword)) c2++;
        })
        //out of stock
        stock.forEach(keyword => {
            if (lower_text.includes(keyword)) c3++;
        })

        const max = Math.max(c1, c2, c3);
        let message = "";

        if (max === 0) {
            message = " Not enough delivery/stock info found in reviews!";
        } else if (max === c1) {
            message = "✅ Fast delivery is commonly mentioned in reviews.";
        } else if (max === c2) {
            message = "⚠️ Some reviews mention delayed delivery.";
        } else if (max === c3) {
            message = "📦 Item might be low in stock or have availability issues.";
        }

        console.log("📝 Extracted reviews:",reviews); // loading in the console 
        const deliver_box = document.createElement("div");
        deliver_box.id = "delivery_update-box";
        deliver_box.innerHTML = `<b>🚚 Delivery & Stock Insight:</b><br> ${message}`;

        document.body.appendChild(deliver_box);
        setTimeout(() => {
            deliver_box.style.display = "none"; 
        }, 5000);
        

    },10000);
});


