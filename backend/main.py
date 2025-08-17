from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image
import os, io, zipfile
import uvicorn
import yt_dlp
import tempfile
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI()
frontend_origin = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Enable CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Explicitly set the port of Backend to 8000
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

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

@app.post("/yt_to_mp3")
async def yt_to_mp3(yt_link: str = Form(...)):
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            ydl_opts = {
                'format': 'ba',
                'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                }],
                'quiet': True,
                'no_warnings': True,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(yt_link, download=True)
                # Get the actual filename that was downloaded
                downloaded_file = ydl.prepare_filename(info)
                mp3_file = os.path.splitext(downloaded_file)[0] + '.mp3'

                # DEBUG STATEMENTS   
                # print(f"Downloaded file: {downloaded_file}")
                # print(f"Expected MP3 path: {mp3_file}")
                # print(f"Exists: {os.path.exists(mp3_file)}")

                # Wait until file exists (post-processing takes time)
                for _ in range(10):
                    if os.path.exists(mp3_file):
                        break
                    await asyncio.sleep(0.5)
                else:
                    raise HTTPException(status_code=500, detail="Conversion timeout")

                with open(mp3_file, "rb") as f:
                    file_content = f.read()

                if info is not None and isinstance(info, dict):
                    filename = info.get('title', 'audio') + '.mp3'
                else:
                    filename = 'audio.mp3'

                return StreamingResponse(
                    content=io.BytesIO(file_content),
                    media_type="audio/mpeg",
                    headers={
                        "Content-Disposition": f"attachment; filename=\"{filename}\"",
                    }
                )

    except yt_dlp.utils.DownloadError as e:
        raise HTTPException(status_code=400, detail=f"Download error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

@app.post("/yt_to_mp4")
async def yt_to_mp4(yt_link: str = Form(...)):
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            ydl_opts = {
                'format': 'mp4/b',
                'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
                'quiet': True,
                'no_warnings': True,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(yt_link, download=True)
                # Get the actual filename that was downloaded
                downloaded_file = ydl.prepare_filename(info)
                mp4_file = os.path.splitext(downloaded_file)[0] + '.mp4'

                # DEBUG STATEMENTS   
                # print(f"Downloaded file: {downloaded_file}")
                # print(f"Expected MP4 path: {mp4_file}")
                # print(f"Exists: {os.path.exists(mp4_file)}")

                # Wait until file exists (post-processing takes time)
                for _ in range(10):
                    if os.path.exists(mp4_file):
                        break
                    await asyncio.sleep(0.5)
                else:
                    raise HTTPException(status_code=500, detail="Conversion timeout")

                with open(mp4_file, "rb") as f:
                    file_content = f.read()

                if info is not None and isinstance(info, dict):
                    filename = info.get('title', 'video') + '.mp4'
                else:
                    filename = 'video.mp4'

                return StreamingResponse(
                    content=io.BytesIO(file_content),
                    media_type="video/mp4",
                    headers={
                        "Content-Disposition": f"attachment; filename=\"{filename}\"",
                    }
                )

    except yt_dlp.utils.DownloadError as e:
        raise HTTPException(status_code=400, detail=f"Download error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")