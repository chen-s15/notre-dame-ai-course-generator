FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
COPY backend/main.py .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 