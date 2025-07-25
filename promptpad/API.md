# PromptPad API Documentation

## Overview

PromptPad is a microservice that generates robust and in-depth prompts from user input using a multi-stage AI pipeline.

## Base URL

- Development: `http://localhost:5000`
- Production: Configure via environment variables

## Endpoints

### Health Check

**GET** `/health`

Check if the service is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "promptpad",
  "version": "1.0.0"
}
```

### API Documentation

**GET** `/`

Get API documentation and usage information.

**Response:**
```json
{
  "service": "PromptPad API",
  "version": "1.0.0",
  "description": "A microservice for generating robust and in-depth prompts",
  "endpoints": {
    "GET /": "API documentation",
    "GET /health": "Health check",
    "POST /generate": "Generate full prompt with all stages"
  }
}
```

### Generate Prompt

**POST** `/generate`

Generate a complete prompt with all pipeline stages.

**Request Body:**
```json
{
  "input": "Write a blog post about AI"
}
```

**Response:**
```json
{
  "success": true,
  "input": "Write a blog post about AI",
  "context_analysis": {
    "Domain": "writing",
    "Complexity": "intermediate",
    "Requirements": "blog post format, AI topic",
    "Output Format": "article/blog post",
    "Key Concepts": "AI, blog writing, content creation"
  },
  "intent": "Create an informative blog post about artificial intelligence for general audience",
  "base_prompt": "You are an expert content writer...",
  "enhanced_prompt": "You are an expert content writer specializing in technology...",
  "final_prompt": "You are an expert content writer specializing in technology and AI..."
}
```

## Error Responses

All endpoints return error responses in this format:

```json
{
  "success": false,
  "error": "Error description"
}
```

**HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request (missing or invalid input)
- `500`: Internal Server Error

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 5000)
- `HOST`: Server host (default: 0.0.0.0)
- `DEBUG`: Enable debug mode (default: false)
- `PRODUCTION`: Force production mode (default: false)

## Usage Examples

### cURL

```bash
# Health check
curl http://localhost:5000/health

# Generate prompt
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{"input": "Write a Python function to sort a list"}'
```

### Python

```python
import requests

# Generate a prompt
response = requests.post(
    "http://localhost:5000/generate",
    json={"input": "Write a Python function to sort a list"}
)

if response.status_code == 200:
    result = response.json()
    print(result["final_prompt"])
else:
    print(f"Error: {response.json()['error']}")
```

## Deployment

### Docker

```bash
# Build the image
docker build -t promptpad .

# Run the container (development)
docker run -p 5000:5000 -e OPENAI_API_KEY=your_key_here promptpad

# Run the container (production)
docker run -p 5000:5000 -e OPENAI_API_KEY=your_key_here -e PRODUCTION=true promptpad
```

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Set your OpenAI API key
export OPENAI_API_KEY=your_key_here

# Run in development mode
python main.py

# Run in production mode
PRODUCTION=true python main.py
``` 