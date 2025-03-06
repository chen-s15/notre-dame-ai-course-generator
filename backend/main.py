from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import openai
from dotenv import load_dotenv
import os
import traceback

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configure CORS with environment variable for frontend URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
ALLOWED_ORIGINS = [
    FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "https://notre-dame-ai-course-generator.vercel.app",  # Vercel production URL
    "https://notre-dame-ai-course-generator-git-main.vercel.app",  # Vercel preview URL
    "https://notre-dame-ai-course-generator-*.vercel.app"  # Any Vercel deployment URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str

SYSTEM_PROMPT = """You are an expert educational content creator and instructional designer with years of experience in curriculum development. Your expertise includes:

1. Curriculum Design:
   - Creating detailed, standards-aligned lesson plans
   - Developing learning objectives and outcomes
   - Structuring course content for optimal learning progression

2. Assessment Creation:
   - Designing various types of assessments (formative, summative, diagnostic)
   - Creating rubrics and scoring guides
   - Developing question banks at different cognitive levels (Bloom's Taxonomy)

3. Activity Development:
   - Designing engaging individual and group activities
   - Creating interactive learning experiences
   - Developing hands-on projects and case studies

4. Teaching Strategies:
   - Incorporating active learning techniques
   - Implementing differentiated instruction methods
   - Using technology effectively in education

When responding:
- Always structure your responses clearly with headers and sections
- Include specific examples and practical implementation tips
- Consider different learning styles and accessibility needs
- Provide measurable learning objectives when relevant
- Suggest ways to assess student understanding
- Include estimated time durations for activities

Remember to be encouraging and supportive while maintaining high academic standards."""

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Convert messages to OpenAI format
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Add system message to set context
        system_message = {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
        messages.insert(0, system_message)

        print("Sending request to OpenAI with messages:", messages)

        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=2000  # Increased token limit for more detailed responses
        )

        return ChatResponse(response=response.choices[0].message.content)

    except Exception as e:
        print(f"Error details: {str(e)}")
        print("Full traceback:")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 