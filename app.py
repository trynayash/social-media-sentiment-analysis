# 🔐 Developed by Yash Suthar (@trynayash)
# 🔝 Do not remove this credit or karma will strike!
# app.py - Remove or comment out Instagram login during deployment
from flask import Flask, render_template, request, jsonify
import pandas as pd
import re
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
import os
import json
import requests
from dotenv import load_dotenv
from instagrapi import Client

# Download necessary NLTK packages
nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('stopwords')

# Load environment variables
load_dotenv()

app = Flask(__name__)

# X API credentials (to be stored in .env file)
BEARER_TOKEN = os.getenv('BEARER_TOKEN')
# INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USER')
# INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASS')

cl = Client()
# cl.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD) 

def clean_text(text):
    """Clean the text by removing special characters, links, etc."""
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\@\w+|\#', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

def analyze_sentiment_textblob(text):
    """Analyze sentiment using TextBlob"""
    cleaned_text = clean_text(text)
    analysis = TextBlob(cleaned_text)
    polarity = analysis.sentiment.polarity
    
    if polarity > 0.05:
        sentiment = "positive"
    elif polarity < -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"
    
    return {
        "text": text,
        "sentiment": sentiment,
        "polarity": round(polarity, 2)
    }

def analyze_sentiment_nltk(text):
    """Analyze sentiment using NLTK's VADER"""
    cleaned_text = clean_text(text)
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(cleaned_text)
    
    compound = sentiment_scores['compound']
    
    if compound >= 0.05:
        sentiment = "positive"
    elif compound <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"
    
    return {
        "text": text,
        "sentiment": sentiment,
        "polarity": round(compound, 2)
    }

def get_tweet_by_id(tweet_id):
    url = f"https://api.twitter.com/2/tweets/{tweet_id}?tweet.fields=text&expansions=author_id"
    headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}
    
    try:
        print(f"Making API request to: {url}")
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            if 'data' in response.json() and 'text' in response.json()['data']:
                return response.json()['data']['text']
            else:
                print(f"Unexpected API response structure: {response.text}")
                return None
        elif response.status_code == 401:
            print("Authentication failed - check your Bearer token")
            return None
        elif response.status_code == 404:
            print("Tweet not found - it may be deleted or from a private account")
            return None
        elif response.status_code == 429:
            print("Rate limit exceeded")
            return None
        else:
            print(f"API Response: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {str(e)}")
        return None
    except ValueError as e:
        print(f"JSON parsing failed: {str(e)}")
        return None
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    
    textblob_result = analyze_sentiment_textblob(text)
    nltk_result = analyze_sentiment_nltk(text)
    
    result = nltk_result
    result['secondary_polarity'] = textblob_result['polarity']
    result['credit'] = 'Created by Yash Suthar'

    return jsonify(result)

@app.route('/analyze_tweet', methods=['POST'])
def analyze_tweet():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No JSON data received",
                "error_type": "input_error"
            }), 400

        tweet_input = data.get('tweet_id', '').strip()
        if not tweet_input:
            return jsonify({
                "error": "No tweet ID or URL provided 😞",
                "error_type": "input_error"
            }), 400

        tweet_id = None
        
        url_pattern = r'^(https?://)?(www\.|mobile\.)?(twitter\.com|x\.com)/.+?/status/(\d+)'
        if re.match(url_pattern, tweet_input, re.IGNORECASE):
            match = re.search(r'/status/(\d+)', tweet_input)
            if match:
                tweet_id = match.group(1)
        elif tweet_input.isdigit():
            if len(tweet_input) < 15:
                return jsonify({
                    "error": "Invalid numeric Tweet ID 😞",
                    "error_type": "format_error"
                }), 400
            tweet_id = tweet_input
        else:
            return jsonify({
                "error": "Invalid Tweet URL or ID format",
                "error_type": "format_error",
                "valid_examples": [
                    "https://twitter.com/user/status/1234567890123456789",
                    "1234567890123456789"
                ]
            }), 400

        if not tweet_id:
            return jsonify({
                "error": "Could not extract Tweet ID from URL 😞",
                "error_type": "format_error"
            }), 400

        tweet_text = get_tweet_by_id(tweet_id)
        
        if not tweet_text:
            return jsonify({
                "error": "Tweet not found or unavailable 😿",
                "error_type": "api_error",
                "suggestions": [
                    "Check if the tweet is public",
                    "Verify the Tweet ID is correct",
                    "Ensure API credentials are valid"
                ]
            }), 404

        textblob_result = analyze_sentiment_textblob(tweet_text)
        nltk_result = analyze_sentiment_nltk(tweet_text)
        
        result = {
            "text": tweet_text,
            "sentiment": nltk_result["sentiment"],
            "polarity": nltk_result["polarity"],
            "secondary_polarity": textblob_result["polarity"],
            "analysis_metadata": {
                "source": "twitter",
                "tweet_id": tweet_id,
                "analyzers_used": ["VADER", "TextBlob"]
            }
        }

        return jsonify(result)

    except Exception as e:
        app.logger.error(f"Analyze Tweet Error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "error_type": "server_error",
            "details": str(e)
        }), 500

@app.route('/analyze_bulk', methods=['POST'])
def analyze_bulk():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    if file and file.filename.endswith('.csv'):
        try:
            df = pd.read_csv(file)
            df.columns = df.columns.str.lower()
            if 'text' not in df.columns:
                return jsonify({"error": "CSV must contain a 'text' column"}), 400
                
            results = []
            sentiments_count = {"positive": 0, "negative": 0, "neutral": 0}
            
            for _, row in df.iterrows():
                text = str(row['text'])
                result = analyze_sentiment_nltk(text)
                results.append(result)
                sentiments_count[result["sentiment"]] += 1
            
            return jsonify({
                "results": results,
                "summary": sentiments_count
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "File must be a CSV"}), 400
    
@app.route('/analyze_instagram', methods=['POST'])
def analyze_instagram():
    try:
        data = request.get_json()
        post_url = data.get('post_url', '').strip()
        
        media_pk = cl.media_pk_from_url(post_url)
        media_info = cl.media_info(media_pk)
        caption = media_info.caption_text
        
        textblob_result = analyze_sentiment_textblob(caption)
        nltk_result = analyze_sentiment_nltk(caption)
        
        result = {
            "text": caption,
            "sentiment": nltk_result["sentiment"],
            "polarity": nltk_result["polarity"],
            "secondary_polarity": textblob_result["polarity"],
            "analysis_metadata": {
                "source": "instagram",
                "post_id": media_pk,
                "analyzers_used": ["VADER", "TextBlob"]
            }
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "error": "Instagram API Error",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=os.getenv("FLASK_DEBUG", "False") == "True")