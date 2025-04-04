from flask import Flask, render_template, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import io
import base64

app = Flask(__name__)

# Load and prepare the model
model = load_model('fashion_mnist_model.h5')
model.make_predict_function()  

# Class labels for Fashion MNIST
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data['image'].split(',')[1]

        # Decode base64 image and process
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        image = image.convert('L').resize((28, 28))
        image = ImageOps.invert(image)  # Invert colors to match MNIST style

        image_array = np.array(image) / 255.0
        image_array = image_array.reshape(1, 28, 28, 1)

        # Predict
        predictions = model.predict(image_array, verbose=0)
        predicted_class = np.argmax(predictions)
        confidence = float(predictions[0][predicted_class] * 100)

        top_indices = np.argsort(predictions[0])[-3:][::-1]
        top_predictions = [
            {'class': class_names[i], 'confidence': float(predictions[0][i] * 100)}
            for i in top_indices
        ]

        return jsonify({
            'predicted_class': class_names[predicted_class],
            'confidence': confidence,
            'top_predictions': top_predictions
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)