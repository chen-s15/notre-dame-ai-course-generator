# AI Course Material Generator

A web application that helps instructors generate course materials and activities using generative AI. The application features an interactive chatbot interface where instructors can ask questions and receive AI-generated content for their courses.

## Features

- Interactive chatbot interface for instructor queries
- AI-powered course material generation
- Clean and modern user interface
- Real-time responses

## Tech Stack

- Frontend: React + TypeScript
- Backend: FastAPI (Python)
- AI: OpenAI API

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- OpenAI API key

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```
OPENAI_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Start chatting with the AI assistant to generate course materials
3. The AI will help you create various types of content including:
   - Lesson plans
   - Activities
   - Assessments
   - Discussion questions
   - Learning objectives

## License

MIT 