// 🔒 Script developed by Yash Suthar (@trynayash)
// 🧠 Tracked and protected by the YashTrap™️
// static/js/script.js
document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".analysis-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Update active nav link
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      // Show target section
      sections.forEach((section) => section.classList.remove("active"));
      document.querySelector(targetId).classList.add("active");
    });
  });

  eval(atob("Y29uc29sZS5sb2coIk1hZGUgYnkgWWFzaCBTdXRoYXIgKHd3dy5naXRodWIuY29tL2Rlc2lnbndpdGh5eHNoKSIpOw=="));

  // Single Text Analysis
  const textInput = document.getElementById("text-input");
  const analyzeBtn = document.getElementById("analyze-btn");
  const resultContainer = document.getElementById("result-container");
  const sentimentBadge = document.getElementById("sentiment-badge");
  const polarityPointer = document.getElementById("polarity-pointer");
  const polarityValue = document.getElementById("polarity-value");
  const analyzedText = document.getElementById("analyzed-text");

  analyzeBtn.addEventListener("click", function () {
    const text = textInput.value.trim();

    if (text.length === 0) {
      alert("Please enter some text to analyze 🧊😡😭");
      return;
    }

    // Show loading animation
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML =
      '<span class="btn-text">Analyzing...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

    fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hide result container first for re-animation
        resultContainer.classList.add("hidden");

        // Update UI with result
        setTimeout(() => {
          updateResultUI(
            data,
            resultContainer,
            sentimentBadge,
            polarityPointer,
            polarityValue,
            analyzedText
          );

          // Show result with animation
          resultContainer.classList.remove("hidden");
          resultContainer.classList.add("result-animation");

          // Launch confetti for positive results
          if (data.sentiment === "positive" && data.polarity > 0.3) {
            launchConfetti();
          }

          // Reset button
          analyzeBtn.disabled = false;
          analyzeBtn.innerHTML =
            '<span class="btn-text">Analyze</span><span class="btn-icon"><i class="fas fa-search"></i></span>';
        }, 500);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while analyzing the text");

        // Reset button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML =
          '<span class="btn-text">Analyze</span><span class="btn-icon"><i class="fas fa-search"></i></span>';
      });
  });

  // Tweet Analysis
  const tweetIdInput = document.getElementById("tweet-id-input");
  const analyzeTweetBtn = document.getElementById("analyze-tweet-btn");
  const tweetResultContainer = document.getElementById(
    "tweet-result-container"
  );
  const tweetSentimentBadge = document.getElementById("tweet-sentiment-badge");
  const tweetPolarityPointer = document.getElementById(
    "tweet-polarity-pointer"
  );
  const tweetPolarityValue = document.getElementById("tweet-polarity-value");
  const tweetText = document.getElementById("tweet-text");

  analyzeTweetBtn.addEventListener("click", function () {
    const tweetInput = tweetIdInput.value.trim();

    // Validate input format
    if (!tweetInput) {
      alert("Please enter a Tweet URL or ID");
      return;
    }

    // Check if input is valid before sending
    // Replace the existing validation check with:

    // Show loading animation
    analyzeTweetBtn.disabled = true;
    analyzeTweetBtn.innerHTML =
      '<span class="btn-text">Analyzing...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

    fetch("/analyze_tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweet_id: tweetInput }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.error || "API Error");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Hide result container first for re-animation
        tweetResultContainer.classList.add("hidden");

        // Update UI with result
        setTimeout(() => {
          updateResultUI(
            data,
            tweetResultContainer,
            tweetSentimentBadge,
            tweetPolarityPointer,
            tweetPolarityValue,
            tweetText
          );

          // Show result with animation
          tweetResultContainer.classList.remove("hidden");
          tweetResultContainer.classList.add("result-animation");

          // Launch confetti for positive results
          if (data.sentiment === "positive" && data.polarity > 0.3) {
            launchConfetti();
          }

          analyzeTweetBtn.disabled = false;
          analyzeTweetBtn.innerHTML =
            '<span class="btn-text">Analyze Tweet</span><span class="btn-icon"><i class="fab fa-x-twitter"></i></span>';
        }, 500);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          error.message = "Failed to parse response from server";
        }
        console.error("Error:", error);
        alert(`Error: ${error.message}`);

        // Reset button
        analyzeTweetBtn.disabled = false;
        analyzeTweetBtn.innerHTML =
          '<span class="btn-text">Analyze Tweet</span><span class="btn-icon"><i class="fab fa-x-twitter"></i></span>';
      });
  });

  // Bulk Analysis
  const csvFileInput = document.getElementById("csv-file-input");
  const fileName = document.getElementById("file-name");
  const analyzeBulkBtn = document.getElementById("analyze-bulk-btn");
  const bulkResultContainer = document.getElementById("bulk-result-container");
  const summaryStats = document.getElementById("summary-stats");
  const toggleDetailsBtn = document.getElementById("toggle-details-btn");
  const detailsContainer = document.getElementById("details-container");
  const resultsTable = document
    .getElementById("results-table")
    .querySelector("tbody");

  let sentimentChart = null;

  csvFileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      fileName.textContent = this.files[0].name;
      analyzeBulkBtn.disabled = false;
    } else {
      fileName.textContent = "Choose CSV file";
      analyzeBulkBtn.disabled = true;
    }
  });

  analyzeBulkBtn.addEventListener("click", function () {
    if (csvFileInput.files.length === 0) {
      alert("Please select a CSV file");
      return;
    }

    // Show loading animation
    analyzeBulkBtn.disabled = true;
    analyzeBulkBtn.innerHTML =
      '<span class="btn-text">Analyzing...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

    const formData = new FormData();
    formData.append("file", csvFileInput.files[0]);

    fetch("/analyze_bulk", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Error processing file");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Hide result container first for re-animation
        bulkResultContainer.classList.add("hidden");

        // Update UI with result
        setTimeout(() => {
          updateBulkResultUI(data);

          // Show result with animation
          bulkResultContainer.classList.remove("hidden");
          bulkResultContainer.classList.add("result-animation");

          // Launch confetti if mostly positive
          if (
            data.summary.positive >
            Math.max(data.summary.negative, data.summary.neutral)
          ) {
            launchConfetti();
          }

          // Reset button
          analyzeBulkBtn.disabled = false;
          analyzeBulkBtn.innerHTML =
            '<span class="btn-text">Analyze Data</span><span class="btn-icon"><i class="fas fa-chart-pie"></i></span>';
        }, 500);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);

        // Reset button
        analyzeBulkBtn.disabled = false;
        analyzeBulkBtn.innerHTML =
          '<span class="btn-text">Analyze Data</span><span class="btn-icon"><i class="fas fa-chart-pie"></i></span>';
      });
  });

  toggleDetailsBtn.addEventListener("click", function () {
    const isHidden = detailsContainer.classList.contains("hidden");

    if (isHidden) {
      detailsContainer.classList.remove("hidden");
      this.innerHTML =
        '<span class="btn-text">Hide Details</span><span class="btn-icon"><i class="fas fa-chevron-up"></i></span>';
    } else {
      detailsContainer.classList.add("hidden");
      this.innerHTML =
        '<span class="btn-text">Show Details</span><span class="btn-icon"><i class="fas fa-chevron-down"></i></span>';
    }
  });

  // Helper Functions
  function updateResultUI(
    data,
    container,
    badge,
    pointer,
    polarityElement,
    textElement
  ) {
    // Handle error state
    if (data.error) {
      badge.textContent = "Error";
      badge.className = "sentiment-badge error";
      polarityElement.textContent = "";
      textElement.textContent = data.error;
      pointer.style.left = "50%";
      return;
    }

    // Update sentiment badge
    badge.textContent = data.sentiment;
    badge.className = `sentiment-badge ${data.sentiment}`;

    // Update polarity meter
    const pointerPosition = ((data.polarity + 1) / 2) * 100;
    pointer.style.left = `${pointerPosition}%`;

    // Update polarity value
    polarityElement.textContent = `Polarity: ${data.polarity}`;

    // Update analyzed text
    textElement.textContent = data.text;
  }

  function updateBulkResultUI(data) {
    // Clear previous results
    summaryStats.innerHTML = "";
    resultsTable.innerHTML = "";

    // Update summary stats
    const total =
      data.summary.positive + data.summary.negative + data.summary.neutral;

    const statsHTML = `
            <div class="stat-item">
                <h4>Positive</h4>
                <div class="stat-value positive">${data.summary.positive}</div>
                <div>${((data.summary.positive / total) * 100 || 0).toFixed(
                  1
                )}%</div>
            </div>
            <div class="stat-item">
                <h4>Neutral</h4>
                <div class="stat-value neutral">${data.summary.neutral}</div>
                <div>${((data.summary.neutral / total) * 100 || 0).toFixed(
                  1
                )}%</div>
            </div>
            <div class="stat-item">
                <h4>Negative</h4>
                <div class="stat-value negative">${data.summary.negative}</div>
                <div>${((data.summary.negative / total) * 100 || 0).toFixed(
                  1
                )}%</div>
            </div>
            <div class="stat-item">
                <h4>Total</h4>
                <div class="stat-value">${total}</div>
                <div>Analyzed</div>
            </div>
        `;

    summaryStats.innerHTML = statsHTML;

    // Update chart
    const ctx = document.getElementById("sentiment-chart").getContext("2d");

    // Destroy previous chart if exists
    if (sentimentChart) {
      sentimentChart.destroy();
    }

    sentimentChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            data: [
              data.summary.positive,
              data.summary.neutral,
              data.summary.negative,
            ],
            backgroundColor: [
              getComputedStyle(document.documentElement).getPropertyValue(
                "--positive-color"
              ),
              getComputedStyle(document.documentElement).getPropertyValue(
                "--neutral-color"
              ),
              getComputedStyle(document.documentElement).getPropertyValue(
                "--negative-color"
              ),
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "'Poppins', sans-serif",
                size: 14,
              },
              padding: 20,
            },
          },
          tooltip: {
            titleFont: {
              family: "'Poppins', sans-serif",
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
            },
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const percentage = ((value / total) * 100 || 0).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1000,
        },
      },
    });

    // Update details table
    data.results.forEach((result) => {
      const row = document.createElement("tr");
      row.className = `row-${result.sentiment}`;

      const textCell = document.createElement("td");
      textCell.textContent =
        result.text.length > 100
          ? `${result.text.substring(0, 100)}...`
          : result.text;

      const sentimentCell = document.createElement("td");
      sentimentCell.textContent =
        result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1);

      const polarityCell = document.createElement("td");
      polarityCell.textContent = result.polarity;

      row.appendChild(textCell);
      row.appendChild(sentimentCell);
      row.appendChild(polarityCell);

      resultsTable.appendChild(row);
    });
  }
  // Instagram Analysis
  
  const instagramPostInput = document.getElementById("instagram-post-input");
  const analyzeInstagramBtn = document.getElementById("analyze-instagram-btn");
  const instagramResultContainer = document.getElementById("instagram-result-container");
  const instagramSentimentBadge = document.getElementById("instagram-sentiment-badge");
  const instagramPolarityPointer = document.getElementById("instagram-polarity-pointer");
  const instagramPolarityValue = document.getElementById("instagram-polarity-value");
  const instagramText = document.getElementById("instagram-text");

  analyzeInstagramBtn.addEventListener("click", function () {
    const postInput = instagramPostInput.value.trim();

    // Validate input format
    if (!postInput) {
      alert("Please enter an Instagram Post URL");
      return;
    }

    // Improved Instagram URL validation
    const isValid = /^(https?:\/\/)?(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/i.test(postInput);
    
    if (!isValid) {
      alert("Please enter a valid Instagram Post URL\nExample: https://www.instagram.com/p/CvBH5mXgQkD/");
      return;
    }

    // Show loading animation
    analyzeInstagramBtn.disabled = true;
    analyzeInstagramBtn.innerHTML = 
      '<span class="btn-text">Analyzing...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

    fetch("/analyze_instagram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_url: postInput }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.error || "Instagram API Error");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Handle API errors in response
        if (data.error) {
          throw new Error(data.error);
        }

        // Hide result container first for re-animation
        instagramResultContainer.classList.add("hidden");

        // Update UI with result
        setTimeout(() => {
          updateResultUI(
            data,
            instagramResultContainer,
            instagramSentimentBadge,
            instagramPolarityPointer,
            instagramPolarityValue,
            instagramText
          );

          // Show result with animation
          instagramResultContainer.classList.remove("hidden");
          instagramResultContainer.classList.add("result-animation");

          // Launch confetti for positive results
          if (data.sentiment === "positive" && data.polarity > 0.3) {
            launchConfetti();
          }

          analyzeInstagramBtn.disabled = false;
          analyzeInstagramBtn.innerHTML = 
            '<span class="btn-text">Analyze Post</span><span class="btn-icon"><i class="fab fa-instagram"></i></span>';
        }, 500);
      })
      .catch((error) => {
        console.error("Instagram Error:", error);
        alert(`Error: ${error.message}`);
        analyzeInstagramBtn.disabled = false;
        analyzeInstagramBtn.innerHTML = 
          '<span class="btn-text">Analyze Post</span><span class="btn-icon"><i class="fab fa-instagram"></i></span>';
      });
  });
  const y = document.createElement("div");
  y.style.cssText = "display:none;";
  y.innerText = "Powered by Yash Suthar";
  document.body.appendChild(y);
  
});
