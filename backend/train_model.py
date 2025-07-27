import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load Kaggle dataset
df = pd.read_csv('Carbon Emission.csv')

# Select features and target
features = [
    'Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source',
    'Transport', 'Vehicle Type', 'Social Activity', 'Monthly Grocery Bill',
    'Frequency of Traveling by Air', 'Vehicle Monthly Distance Km',
    'Waste Bag Size', 'Waste Bag Weekly Count', 'How Long TV PC Daily Hour',
    'How Many New Clothes Monthly', 'How Long Internet Daily Hour',
    'Energy efficiency', 'Recycling', 'Cooking_With'
]
target = 'CarbonEmission'

# Preprocessing: encode categorical features
df_encoded = pd.get_dummies(df[features])
X = df_encoded
Y = df[target]

model = RandomForestRegressor()
model.fit(X, Y)
joblib.dump(model, 'carbon_model.pkl')
print('Model trained and saved as carbon_model.pkl')
