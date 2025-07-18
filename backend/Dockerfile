FROM python:3.9-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt .

# Install system dependencies and Python dependencies
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose the backend port
EXPOSE 8000

# Command to start FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
