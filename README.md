<div align="center">
  <!-- Fixed: Replaced broken image host with actual image URL -->
  <img src="https://iili.io/3cuN8Kv.md.png" width="100%" alt="Social Media Sentiment Analysis Banner">
</div>

<div align="center">
  <h1>🧠 Social Media Sentiment Analysis<h1>

  <p>
    Analyze emotional tone from <strong>Text</strong>, <strong>Twitter (X)</strong> posts, 
    <strong>Instagram</strong> captions, and <strong>CSV</strong> data in real-time.<br />
    Built, protected, and designed by <strong>Yash Suthar</strong> ✨
  </p>

  <!-- Fixed: Removed placeholder demo URL -->
  <img src="https://img.shields.io/badge/Live%20Demo-Not%20Deployed%20Yet-lightgrey?style=flat-square" />
  <img src="https://img.shields.io/badge/Protected-YashTrap™-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Built%20with-Flask%20%26%20Python-blue?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?logo=javascript" />
  <img src="https://img.shields.io/badge/NLP-VADER%20%2B%20TextBlob-red?logoColor=white" />
</div>

---

## 🚀 Features

- 🔍 Analyze sentiments in **real-time**
- 🐍 Built with **Python** and **Flask**
- 🤖 NLP models using **VADER** & **TextBlob**
- 📊 Upload and process **CSV** files for bulk sentiment analysis
- 🐦 Twitter (X) API integration (requires developer access)
- ⚠️ Instagram support via session file (use at your own risk)
- 🔐 Protected by **YashTrap™ watermark system**

---

## 🛠️ Tech Stack

| Category     | Tech Used                       |
|--------------|----------------------------------|
| Backend      | Flask, Python                   |
| Frontend     | HTML, CSS, JavaScript           |
| NLP          | VADER, TextBlob                 |
| Data         | Pandas, Matplotlib              |
| APIs         | Twitter API v2, Instagrapi      |
| Protection   | Custom watermark system        |

---

## 🧪 How to Run Locally

```bash
# Clone this repository
git clone https://github.com/trynayash/social-media-sentiment-analysis.git
cd social-media-sentiment-analysis

# Install dependencies
pip install -r requirements.txt

# Set environment variables (Twitter API)
export TWITTER_BEARER_TOKEN="your_twitter_bearer_token"

# Run the Flask app
python app.py

⚠️ Important Notes:

Twitter API requires developer access

Instagram integration uses unofficial API - may require manual login

Generate session file using instagrapi_login.py (see docs)

📁 Folder Structure
Copy
📦project-root
 ┣ 📜app.py
 ┣ 📁static/
 ┣ 📁templates/
 ┣ 📜requirements.txt
 ┣ 📜README.md
 ┣ 📜.env.example
 ┗ 📜instagrapi_login.py (new helper script)
📷 Screenshots
<div align="center"> <!-- Fixed: Direct image links with proper URLs --> <img src="https://i.ibb.co/0jQGR0B/dashboard-preview.png" width="90%" /> <img src="https://i.ibb.co/6YCW3Mg/results-preview.png" width="90%" /> </div>
👨‍💻 Author
Developed by Yash Suthar
🛡️ AI enthusiast with focus on ethical implementations

🛡️ License
MIT License - See LICENSE for details.
YashTrap™ watermark system remains proprietary.

🌐 Deployment Recommendations
Recommended platforms:

Render (Python Web Service)

Heroku (Container Registry)

PythonAnywhere

🚫 Avoid Vercel - not suitable for Flask applications

⭐ Found this useful? Please star the repo and share!