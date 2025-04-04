🧥 Fashion MNIST Classification & Deployment 🚀
Overview
This project trains a deep learning model on the Fashion MNIST dataset to classify clothing items into 10 categories. The model achieves an accuracy of 90.1%. The trained model is then deployed using Flask/TensorFlow Serving/Streamlit (choose your deployment method).

Dataset 📊
The Fashion MNIST dataset consists of 70,000 grayscale images (28x28 pixels) of clothing items labeled into 10 categories:

T-shirt/top

Trouser

Pullover

Dress

Coat

Sandal

Shirt

Sneaker

Bag

Ankle boot

Model Architecture 🏗️
The model is built using TensorFlow/Keras with the following layers:

Conv2D layers with ReLU activation

MaxPooling layers for downsampling

Flatten layer to convert feature maps into a vector

Dense layers for classification

Softmax activation for multi-class output

Training 📈
Optimizer: Adam

Loss function: Categorical Crossentropy

Batch size: 64

Epochs: 10

Dataset Split: 60,000 training + 10,000 testing

Results 🎯
✅ Test Accuracy: 90.1%
✅ Loss: ~0.3

Deployment 🌍
The trained model is deployed using Flask.
