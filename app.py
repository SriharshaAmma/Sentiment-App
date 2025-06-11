from flask import Flask, render_template, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    scores = analyzer.polarity_scores(text)
    sentiment = 'Positive 😊' if scores['compound'] > 0 else 'Negative 😠' if scores['compound'] < 0 else 'Neutral 😐'
    return jsonify(sentiment=sentiment, score=scores)

if __name__ == '__main__':
    app.run(debug=True)
