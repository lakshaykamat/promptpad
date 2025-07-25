# PromptPad Project Structure

## Overview

PromptPad has been restructured into a clean, modular architecture that separates concerns and promotes maintainability. The new structure follows Python best practices and makes the codebase more organized and extensible.

## Directory Structure

```
promptpad/
├── promptpad/                    # Main package
│   ├── __init__.py              # Package initialization
│   ├── core/                    # Core pipeline components
│   │   ├── __init__.py
│   │   ├── context_analyzer.py  # Context analysis component
│   │   ├── intent_interpreter.py # Intent interpretation
│   │   ├── prompt_generator.py  # Base prompt generation
│   │   ├── prompt_enhancer.py   # Prompt enhancement
│   │   ├── prompt_refiner.py    # Final prompt refinement
│   │   └── pipeline.py          # Main pipeline orchestrator
│   ├── api/                     # Web API layer
│   │   ├── __init__.py
│   │   └── app.py               # Flask application factory
│   ├── cli/                     # Command-line interface
│   │   ├── __init__.py
│   │   └── main.py              # CLI implementation
│   └── config/                  # Configuration management
│       ├── __init__.py
│       └── settings.py          # Application settings
├── tests/                       # Test suite
│   ├── __init__.py
│   └── test_pipeline.py         # Pipeline tests
├── cli/                         # CLI entry point
│   ├── __init__.py
│   └── main.py                  # CLI executable
├── main.py                      # Flask app entry point (dev & prod)
├── requirements.txt             # Dependencies
├── pyproject.toml              # Project configuration
├── Dockerfile                   # Container configuration
└── API.md                      # API documentation
```

## Module Descriptions

### Core Module (`promptpad/core/`)

The core module contains all the pipeline components:

- **`context_analyzer.py`**: Analyzes user input for domain, complexity, and requirements
- **`intent_interpreter.py`**: Extracts comprehensive task intent from user input
- **`prompt_generator.py`**: Creates comprehensive base prompts from intent and context
- **`prompt_enhancer.py`**: Adds depth, specificity, and actionable instructions
- **`prompt_refiner.py`**: Final refinement for clarity and effectiveness
- **`pipeline.py`**: Orchestrates all components into a complete pipeline

### API Module (`promptpad/api/`)

The API module handles the web service layer:

- **`app.py`**: Flask application factory with all routes and endpoints

### CLI Module (`promptpad/cli/`)

The CLI module provides command-line interface:

- **`main.py`**: Simple command-line interface that takes a prompt and outputs the result

### Config Module (`promptpad/config/`)

The config module manages application settings:

- **`settings.py`**: Environment variable loading and validation

### CLI Entry Point (`cli/`)

The CLI entry point folder contains the executable:

- **`main.py`**: CLI executable that can be run directly

## Key Benefits of the New Structure

### 1. **Separation of Concerns**
- Each component has a single responsibility
- Clear boundaries between different layers (core, API, CLI, config)
- Easy to understand and maintain

### 2. **Modularity**
- Components can be used independently
- Easy to add new pipeline stages
- Simple to test individual components

### 3. **Extensibility**
- New components can be added without affecting existing code
- Multiple interfaces (API, CLI) can use the same core logic
- Easy to add new features or modify existing ones

### 4. **Testability**
- Each component can be tested in isolation
- Clear interfaces make mocking easier
- Comprehensive test coverage possible

### 5. **Configuration Management**
- Centralized settings management
- Environment variable validation
- Easy to configure for different environments

## Usage Examples

### As a Library

```python
from promptpad.core import PromptPipeline

# Initialize pipeline
pipeline = PromptPipeline(temperature=0.2)

# Generate a prompt
result = pipeline.run("Write a blog post about AI")
print(result["final_prompt"])
```

### As a CLI Tool

```bash
# Install the package
pip install -e .

# Use the CLI (simple usage)
promptpad "Write a Python function to sort a list"
promptpad "Create a marketing email for a new product"
promptpad "Write a blog post about artificial intelligence"

# Or run directly from cli folder
python cli/main.py "Write a Python function to sort a list"
```

### As a Web Service

```bash
# Development mode
python main.py

# Production mode
PRODUCTION=true python main.py

# Or with Docker
docker run -p 5000:5000 -e OPENAI_API_KEY=your_key_here promptpad
```

## Environment Variables

The CLI automatically loads configuration from environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `TEMPERATURE`: LLM temperature setting (default: 0.2)
- `MODEL_NAME`: OpenAI model to use (default: gpt-3.5-turbo)

## Development Workflow

### Adding New Components

1. Create a new file in the appropriate module
2. Implement the component following the existing patterns
3. Add it to the relevant `__init__.py` file
4. Update the pipeline if needed
5. Add tests for the new component

### Testing

```bash
# Run tests
pytest tests/

# Run with coverage
pytest --cov=promptpad tests/
```

### Code Quality

```bash
# Format code
black promptpad/

# Lint code
flake8 promptpad/

# Type checking
mypy promptpad/
```

## Migration from Old Structure

The old `prompt-engine/main.py` file has been completely restructured. The functionality is now distributed across multiple modules:

- **Pipeline logic**: `promptpad/core/pipeline.py`
- **Individual components**: `promptpad/core/*.py`
- **Web API**: `promptpad/api/app.py`
- **Configuration**: `promptpad/config/settings.py`

This new structure makes the codebase much more maintainable and follows Python best practices for package organization. 