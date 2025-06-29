import os
import cv2
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .db import users_collection


import tensorflow as tf
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PIL import Image

from django.conf import settings


@api_view(['POST'])
def login_user(request):
    name = request.data.get("name")
    phone = request.data.get("phone")

    if not name or not phone:
        return Response({"message": "Name and phone number are required"}, status=400)

    user = users_collection.find_one({"phone": phone})

    if user:
        return Response({"message": "Login successful", "user": {"name": user["name"], "phone": user["phone"]}})
    else:
        users_collection.insert_one({"name": name, "phone": phone})
        return Response({"message": "User registered and logged in", "user": {"name": name, "phone": phone}})
    
    
# Load the trained model only once
MODEL_PATH = os.path.join(settings.BASE_DIR, "agri_app", "models", "trained_plant_disease_model_apple.keras")
model = tf.keras.models.load_model(MODEL_PATH)

# Class names (ensure these match your training class order)
CLASS_NAMES = [
    "Apple_Apple_scab", "Apple_Black_rot", "Apple_Cedar_apple_rust",
    "Apple__healthy", "Blueberry_healthy", "Cherry(including_sour)_healthy",
    "Cherry_(including_sour)Powdery_mildew", "Corn(maize)_Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)Common_rust", "Corn_(maize)_Northern_Leaf_Blight",
    "Corn_(maize)healthy", "Grape_Black_rot", "Grape_Esca(Black_Measles)",
    "Grape_Leaf_blight(Isariopsis_Leaf_Spot)", "Grape__healthy",
    "Orange_Haunglongbing(Citrus_greening)", "Peach__Bacterial_spot",
    "Peach_healthy", "Pepper,_bell_Bacterial_spot", "Pepper,_bell_healthy",
    "Potato_Early_blight", "Potato_Late_blight", "Potato_healthy",
    "Raspberry_healthy", "Soybean_healthy", "Squash_Powdery_mildew",
    "Strawberry_Leaf_scorch", "Strawberry_healthy", "Tomato_Bacterial_spot",
    "Tomato_Early_blight", "Tomato_Late_blight", "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites Two-spotted_spider_mite",
    "Tomato_Target_Spot", "Tomato_Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato_Tomato_mosaic_virus", "Tomato_healthy"
]

# Preprocess image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (128, 128))  # Ensure correct size
    img = img / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@api_view(["POST"])
def predict_disease(request):
    if "file" not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    # Save the uploaded image
    uploaded_file = request.FILES["file"]
    file_name = default_storage.save("media/" + uploaded_file.name, ContentFile(uploaded_file.read()))
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)

    try:
        # Preprocess and predict
        image = preprocess_image(file_path)
        predictions = model.predict(image)
        predicted_class = CLASS_NAMES[np.argmax(predictions)]

        return Response({"disease": predicted_class})
    except Exception as e:
        return Response({"error": str(e)},status=500)