# PromptPad

A modular prompt engineering framework for transforming raw user input into optimized prompts for large language models.

## Overview

PromptPad provides a five-stage pipeline that converts vague or incomplete user instructions into clear, specific prompts designed to maximize LLM performance. The framework uses LangChain to orchestrate multiple AI models, each specialized for a specific aspect of prompt refinement.

## Architecture

### Core Components

**ContextAnalyzer**
- Analyzes user input for domain, complexity, and requirements
- Extracts key concepts and expected output format
- Determines appropriate context for prompt generation

**IntentInterpreter**
- Extracts comprehensive task intent from user input
- Captures primary objectives and secondary goals
- Identifies specific constraints and expected outcomes

**PromptGenerator** 
- Creates comprehensive base prompts from intent and context
- Includes role definitions and detailed task descriptions
- Specifies quality criteria and evaluation standards

**PromptEnhancer**
- Adds depth, specificity, and actionable instructions
- Includes relevant examples and domain-specific terminology
- Incorporates error prevention and edge case handling

**PromptRefiner**
- Final refinement for clarity and effectiveness
- Optimizes structure for LLM processing
- Ensures professional formatting and conciseness

### Pipeline Flow

```
User Input → Context Analysis → Intent Extraction → Prompt Generation → Enhancement → Refinement → Final Output
```

## Technology Stack

- **LangChain**: Core orchestration and prompt management
- **OpenAI GPT**: Primary LLM for all processing stages
- **Flask**: Web API framework
- **Python 3.11+**: Runtime environment
- **Environment Variables**: Secure configuration management

## Project Structure

```
promptpad/
├── promptpad/                    # Main package
│   ├── core/                    # Core pipeline components
│   │   ├── context_analyzer.py  # Context analysis
│   │   ├── intent_interpreter.py # Intent interpretation
│   │   ├── prompt_generator.py  # Base prompt generation
│   │   ├── prompt_enhancer.py   # Prompt enhancement
│   │   ├── prompt_refiner.py    # Final refinement
│   │   └── pipeline.py          # Main orchestrator
│   ├── api/                     # Web API layer
│   │   └── app.py               # Flask application
│   ├── cli/                     # Command-line interface
│   │   └── main.py              # CLI implementation
│   └── config/                  # Configuration management
│       └── settings.py          # Settings management
├── main.py                      # Flask app entry point
├── pyproject.toml              # Project configuration
└── Dockerfile                   # Container configuration
```

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd promptpad

# Install dependencies
pip install -r requirements.txt

# Set your OpenAI API key
export OPENAI_API_KEY=your_key_here
```

### Usage

#### As a CLI Tool

```bash
# Simple usage - just pass your prompt
promptpad "Write a blog post about AI"
promptpad "Create a Python function to sort a list"
promptpad "Generate a marketing email for a new product"
```

#### As a Web Service

```bash
# Development mode
python main.py

# Production mode
PRODUCTION=true python main.py

# Access the API
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{"input": "Write a blog post about AI"}'
```

#### As a Library

```python
from promptpad.core import PromptPipeline

# Initialize pipeline
pipeline = PromptPipeline(temperature=0.2)

# Generate a prompt
result = pipeline.run("Write a blog post about AI")
print(result["final_prompt"])
```

#### With Docker

```bash
# Build and run
docker build -t promptpad .
docker run -p 5000:5000 -e OPENAI_API_KEY=your_key_here promptpad
```

## Configuration

The framework uses environment variables for configuration:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `TEMPERATURE`: LLM temperature setting (default: 0.2)
- `MODEL_NAME`: OpenAI model to use (default: gpt-3.5-turbo)
- `PORT`: Server port (default: 5000)
- `HOST`: Server host (default: 0.0.0.0)
- `DEBUG`: Enable debug mode (default: false)
- `PRODUCTION`: Force production mode (default: false)

## API Endpoints

- `GET /` - API documentation
- `GET /health` - Health check
- `POST /generate` - Generate complete prompt with all pipeline stages

## Dependencies

- `langchain_openai`: OpenAI integration
- `langchain`: Core framework
- `langchain_community`: Community components
- `flask`: Web framework
- `python-dotenv`: Environment variable management

## Design Principles

- **Modularity**: Each component has a single, well-defined responsibility
- **Extensibility**: Pipeline stages can be added, removed, or modified
- **Reliability**: Error handling and graceful degradation
- **Performance**: Optimized for minimal API calls and latency
- **Simplicity**: Easy-to-use interfaces with sensible defaults

## Development

```bash
# Install in development mode
pip install -e .

# Run tests
pytest tests/

# Format code
black promptpad/

# Lint code
flake8 promptpad/
```

## License

MIT
