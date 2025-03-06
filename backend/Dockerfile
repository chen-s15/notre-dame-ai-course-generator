FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
COPY main.py .
COPY runtime.txt .
COPY Procfile .

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${PORT:-8000}"] 