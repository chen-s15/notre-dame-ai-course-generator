# AI Course Material Generator

A web application that helps instructors generate course materials and activities using generative AI. The application features an interactive chatbot interface where instructors can ask questions and receive AI-generated content for their courses.

## Features

- Interactive chatbot interface for instructor queries
- AI-powered course material generation
- Clean and modern user interface with Notre Dame branding
- Real-time responses
- Export conversations to CSV

## Deployment

The application is deployed on:
- Frontend: [Vercel](https://notre-dame-ai-course-generator.vercel.app)
- Backend: [Railway](https://notre-dame-ai-course-generator-production.up.railway.app)

## API Key Management

### Local Development
1. Create or update the `backend/.env` file:
```
OPENAI_API_KEY=your-api-key-here
```
2. Never commit this file to Git (it's already in .gitignore)

### Production Environment (Railway)
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select the "notre-dame-ai-course-generator" project
3. Click on "Variables" in the left sidebar
4. Find and update the `OPENAI_API_KEY` variable
5. Railway will automatically redeploy with the new key

### Security Notes
- Never commit API keys to Git
- Keep your API keys secure and private
- If a key is exposed, rotate it immediately
- Use different API keys for development and production

## Tech Stack

- Frontend: React + TypeScript
- Backend: FastAPI (Python)
- AI: OpenAI API (GPT-4)
- Deployment: Vercel (Frontend) + Railway (Backend)

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

1. Open your browser and navigate to `http://localhost:5173` for local development
2. Start chatting with the AI assistant to generate course materials
3. The AI will help you create various types of content including:
   - Lesson plans
   - Activities
   - Assessments
   - Discussion questions
   - Learning objectives
4. Use the "Export Chat" button to download your conversation as a CSV file

## Troubleshooting

### API Key Issues
1. Check if your OpenAI API key is valid and has sufficient credits
2. Verify the key is correctly set in the appropriate environment
3. For local development, ensure the `.env` file exists and contains the correct key
4. For production, verify the key in Railway's environment variables

### Common Errors
- "Failed to get response from AI": Usually indicates an API key or rate limit issue
- Network errors: Check your internet connection and the backend server status

## License

MIT 