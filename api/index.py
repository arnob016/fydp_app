from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io

app = FastAPI()

# Load your model
model = load_model("api/DenseNet201.h5")


@app.post("/classify-image/")
async def classify_image(file: UploadFile = File(...)):
    contents = await file.read()
    img = image.load_img(
        io.BytesIO(contents), target_size=(224, 224)
    )  # Adjust target_size as per your model
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    # Perform prediction
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])

    return JSONResponse(content={"predicted_class": int(predicted_class)})
