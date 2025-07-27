from flask import Flask, request, jsonify

import joblib
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
import os

port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=port)

load_dotenv()
app = Flask(__name__)
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'carbon_model.pkl')

# Load model
model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

# Setup MongoDB client
MONGO_URI = os.getenv('MONGO_URI')
mongo_client = MongoClient(MONGO_URI) if MONGO_URI else None
db = mongo_client['sapphire'] if mongo_client is not None else None
predictions_collection = db['predictions'] if db is not None else None

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = [
        data.get('carKmWeek', 0),
        data.get('flightHours', 0),
        data.get('bikeKmWeek', 0),
        data.get('electricityKwh', 0),
        data.get('gasUsage', 0),
        data.get('dietType', 0),
        data.get('monthlySpend', 0)
    ]
    if model:
        prediction = model.predict([features])[0]
        result = {'carbon_footprint': float(prediction)}
        # Store prediction in MongoDB
        if predictions_collection:
            record = {
                'input': data,
                'carbon_footprint': float(prediction)
            }
            predictions_collection.insert_one(record)
        return jsonify(result)
    else:
        return jsonify({'error': 'Model not found'}), 500

@app.route('/predictions', methods=['GET'])
def get_predictions():
    if predictions_collection:
        records = list(predictions_collection.find({}, {'_id': 0}))
        return jsonify(records)
    else:
        return jsonify({'error': 'Database not connected'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
