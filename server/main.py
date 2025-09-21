from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os, json
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = FastAPI(title="Umeed Sentiment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextIn(BaseModel):
    text: str
    lang: str = "en-IN"

@app.get("/models")
def list_models():
    # keep it simple for demo
    return {"available": ["en-IN", "en-US", "hi", "gu"]}

def english_sentiment(text: str) -> str:
    sia = SentimentIntensityAnalyzer()
    s = sia.polarity_scores(text)
    if s["compound"] >= 0.05:
        return "Positive"
    elif s["compound"] <= -0.05:
        return "Negative"
    return "Neutral"

def multilingual_sentiment(text: str) -> str:
    try:
        from transformers import pipeline  # optional, if installed
        clf = pipeline("sentiment-analysis", model="cardiffnlp/twitter-xlm-roberta-base-sentiment")
        res = clf(text[:512])[0]
        return res.get("label", "neutral")
    except Exception:
        return "Neutral"

def pick_sentiment(lang_key: str, text: str) -> str:
    if not text:
        return "Neutral"
    if lang_key.lower().startswith("en"):
        return english_sentiment(text)
    return multilingual_sentiment(text)

@app.post("/analyze-text")
def analyze_text(inp: TextIn):
    return {"text": inp.text, "sentiment": pick_sentiment(inp.lang, inp.text)}

@app.post("/analyze-audio")
async def analyze_audio(lang: str = Form("en-IN"), file: UploadFile = File(...)):
    # ✅ Lazy import Vosk/NumPy ONLY when this endpoint is hit
    try:
        from vosk import Model, KaldiRecognizer
        # NOTE: no direct numpy import required by us; vosk bundles what it needs
    except Exception:
        return {"error": "Audio recognition not available on this server. Use text mode for now."}

    data = await file.read()
    # very naive WAV header strip (ok for demo)
    if data[:4] == b"RIFF":
        audio_bytes = data[44:]
    else:
        audio_bytes = data

    model_path = r"D:\Krish\vosk-model-small-en-in-0.4"  # TODO: point to your model
    if not os.path.isdir(model_path):
        return {"error": "Vosk model not found. Update model_path in main.py."}

    model = Model(model_path)
    rec = KaldiRecognizer(model, 16000)

    text_out = ""
    step = 4000 * 2
    for i in range(0, len(audio_bytes), step):
        if rec.AcceptWaveform(audio_bytes[i:i+step]):
            try:
                part = json.loads(rec.Result()).get("text", "")
                if part:
                    text_out += (" " if text_out else "") + part
            except:
                pass
    try:
        final = json.loads(rec.FinalResult()).get("text", "")
        if final:
            text_out += (" " if text_out else "") + final
    except:
        pass

    return {"text": text_out.strip(), "sentiment": pick_sentiment(lang, text_out)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9090)
