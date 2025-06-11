// Dark mode toggle setup — runs once when page loads
const toggleBtn = document.getElementById('darkModeToggle');

// Apply saved theme on page load
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Listen for toggle clicks
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Sentiment analysis function — separate from dark mode logic
async function analyzeSentiment() {
  const text = document.getElementById("inputText").value;

  if (!text.trim()) {
    alert("⚠️ Please enter some text before analyzing!");
    return;
  }

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("❌ Server returned an error!");
    }

    const data = await response.json();

    document.getElementById("result").innerHTML = `
      🧠 <b>Sentiment:</b> ${data.sentiment} <br>
      📊 <b>Score:</b> <pre>${JSON.stringify(data.score, null, 2)}</pre>
    `;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "❌ Error analyzing sentiment.";
  }
}
