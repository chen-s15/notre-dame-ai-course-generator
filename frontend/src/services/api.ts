const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Message {
  role: string
  content: string
}

export async function sendMessage(messages: Message[]): Promise<string> {
  try {
    console.log('Sending request to:', `${API_URL}/api/chat`);
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
} 