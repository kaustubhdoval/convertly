from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from PIL import Image
import os, io, zipfile
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Default Localhost for Vite
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

@app.post("/convert")
async def convert_images(
    files: list[UploadFile] = File(...),
    output_format: str = Form(...),
):
    zip_io = io.BytesIO()

    with zipfile.ZipFile(zip_io, mode='w') as zipf:
        for file in files:
            img = Image.open(file.file)

            output_bytes = io.BytesIO()
            img.save(output_bytes, format=output_format.upper())
            output_bytes.seek(0)

            filename = file.filename or "file"
            new_filename = f"{os.path.splitext(filename)[0]}.{output_format}"
            zipf.writestr(new_filename, output_bytes.read())

    zip_io.seek(0)
    return StreamingResponse(
        zip_io,
        media_type="application/x-zip-compressed",
        headers={"Content-Disposition": "attachment; filename=converted_images.zip"}
    )


@app.post("/resize")
async def resize_images(
    files: list[UploadFile] = File(...),
    resize_width: int = Form(None),
    resize_height: int = Form(None),
):
    zip_io = io.BytesIO()

    with zipfile.ZipFile(zip_io, mode='w') as zipf:
        for file in files:
            img = Image.open(file.file)
            if resize_width and resize_height:
                img = img.resize((resize_width, resize_height))

            # Get the original file extension
            filename = file.filename or "file"
            file_ext = os.path.splitext(filename)[1][1:].lower()  # e.g. 'jpg', 'png'
            
            # Handle cases where extension might be empty or not recognized
            if not file_ext or file_ext not in ['jpeg', 'png', 'gif', 'bmp']:
                file_ext = 'jpeg'  # default to jpeg if unknown

            output_bytes = io.BytesIO()
            img.save(output_bytes, format=file_ext)
            output_bytes.seek(0)

            new_filename = f"{os.path.splitext(filename)[0]}.{file_ext}"
            zipf.writestr(new_filename, output_bytes.read())

    zip_io.seek(0)
    return StreamingResponse(
        zip_io,
        media_type="application/x-zip-compressed",
        headers={"Content-Disposition": "attachment; filename=resized_images.zip"}
    )

# Explicitly set the port to 8000
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)