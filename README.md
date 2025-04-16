
<div align="center">
  <img src="https://iili.io/3cugaG1.md.png" width="100%" alt="Social Media Sentiment Analysis Banner" />
</div>

<h1 align="center">🧠 Social Media Sentiment Analysis</h1>

<p align="center">
  Analyze emotional tone from <strong>Text</strong>, <strong>Twitter (X)</strong> posts, 
  <strong>Instagram</strong> captions, and <strong>CSV</strong> data in real-time.<br />
  Built, protected, and designed by <strong>Yash Suthar</strong> ✨
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Live%20Demo-Not%20Deployed%20Yet-lightgrey?style=flat-square" />
  <img src="https://img.shields.io/badge/Protected-YashTrap™-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Built%20with-Flask%20%26%20Python-blue?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?logo=javascript" />
  <img src="https://img.shields.io/badge/NLP-VADER%20%2B%20TextBlob-red?logoColor=white" />
</p>

---

## 🚀 Features

- 🔍 **Real-time** sentiment analysis
- 🧠 Powered by **VADER** and **TextBlob**
- 🐍 Backend with **Flask & Python**
- 📊 Upload **CSV** files for batch processing
- 🐦 Twitter (X) integration using API v2
- 📸 Instagram analysis via session file login
- 🔐 **YashTrap™** watermark system protection

---

## 🛠️ Tech Stack

| Layer         | Technologies                          |
|---------------|---------------------------------------|
| Backend       | Flask, Python                         |
| Frontend      | HTML, CSS, JavaScript                 |
| NLP Engine    | VADER, TextBlob                       |
| Data Handling | Pandas, Matplotlib                    |
| APIs          | Twitter API v2, Instagrapi (Unofficial)|
| Security      | Proprietary YashTrap™ watermark system|

---

## 📦 Project Structure

```
social-media-sentiment-analysis/
├── app.py                     # Main Flask app
├── static/                   # Static files (CSS, JS, assets)
├── templates/                # HTML templates
├── instagrapi_login.py       # Instagram session generator
├── requirements.txt          # Python dependencies
├── .env.example              # Env variables template
└── README.md
```

---

## 🧪 Getting Started

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/trynayash/social-media-sentiment-analysis.git
cd social-media-sentiment-analysis

# Install dependencies
pip install -r requirements.txt
```

### 🔐 Environment Setup

Create a `.env` file or export variables in your terminal:

```bash
export TWITTER_BEARER_TOKEN="your_twitter_bearer_token"
```

⚠️ Instagram login uses an unofficial API. Run the following helper once:

```bash
python instagrapi_login.py
```

This will generate a session file for secure use in `app.py`.

### ▶️ Run the App

```bash
python app.py
```

Visit: [http://localhost:5000](http://localhost:5000)

---

## 📷 Screenshots

<div align="center">
  <img src="https://i.ibb.co/0jQGR0B/dashboard-preview.png" width="90%" alt="Dashboard Preview" />
  <br><br>
  <img src="https://i.ibb.co/6YCW3Mg/results-preview.png" width="90%" alt="Results Preview" />
</div>

---

## 💡 Tips & Notes

- **Twitter API**: Requires developer account and active Bearer Token.
- **Instagram**: Uses Instagrapi (unofficial), which may break over time. Use cautiously.
- **CSV Analysis**: Supports UTF-8 CSVs with a single text column.

---

## 🌐 Deployment Recommendations

| Platform        | Status    | Notes                             |
|-----------------|-----------|-----------------------------------|
| Render          | ✅ Good    | Use Python web service setup      |
| Heroku          | ✅ Good    | Use Container Registry for Flask  |
| PythonAnywhere  | ✅ Good    | Easy for quick deployments        |
| Vercel          | ❌ Avoid   | Not suitable for Flask apps       |

---

## 👨‍💻 Author

**Yash Suthar**  
🎓 AI Enthusiast | 📊 Data Explorer | 💻 Ethical Tech Advocate

- 💼 [LinkedIn](https://www.linkedin.com/in/yash-suthar/)
- 🎨 [designwithyxsh (Fiverr)](https://www.fiverr.com/designwithyxsh)
- 🌐 [Willing2Digital](https://willing2digital.in)

---

## 🛡️ License

This project is licensed under the **MIT License**.  
However, the proprietary `YashTrap™` watermark system remains protected and must not be altered or redistributed.

---

## ⭐ Show Support

If you found this project useful:

- 🌟 Star this repository
- 🌀 Share it with others
- 🛠️ Contribute or suggest features

---

Made with ❤️ by **Yash Suthar**
