from flask import Flask, request, jsonify
from flask_cors import CORS 
from sumy.summarizers.luhn import LuhnSummarizer 
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
import nltk
nltk.download('punkt')

app = Flask(__name__)
CORS(app) 

@app.route("/summarize", methods=["POST"])
def summary():
    data = request.get_json()
    text = data.get("text", "")
    
    if not text or len(text.split()) < 30:
        return jsonify({"summary": text})

    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LuhnSummarizer()
    summarised_review = summarizer(parser.document, 7)
    summary = " ".join(str(sentence) for sentence in summarised_review)

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(port=5000)
