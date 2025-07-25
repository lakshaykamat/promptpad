# PromptPad

A modular prompt engineering framework for transforming raw user input into optimized prompts for large language models.

## Overview

PromptPad provides a three-stage pipeline that converts vague or incomplete user instructions into clear, specific prompts designed to maximize LLM performance. The framework uses LangChain to orchestrate multiple AI models, each specialized for a specific aspect of prompt refinement.

## Architecture

### Core Components

**IntentInterpreter**
- Extracts the underlying task or intent from raw user input
- Produces concise, single-sentence interpretations
- Handles ambiguous or incomplete instructions

**PromptGenerator** 
- Converts interpreted intent into structured prompts
- Creates clear, actionable instructions for LLMs
- Maintains context and specificity

**PromptImprover**
- Refines generated prompts for clarity and effectiveness
- Enhances wording and structure
- Removes redundancy and ambiguity

### Pipeline Flow

```
User Input → Intent Extraction → Prompt Generation → Prompt Refinement → Final Output
```

## Technology Stack

- **LangChain**: Core orchestration and prompt management
- **OpenAI GPT**: Primary LLM for all processing stages
- **Python 3.11+**: Runtime environment
- **Environment Variables**: Secure API key management

## Project Structure

```
promptpad/
├── prompt-engine/          # Core pipeline implementation
│   ├── main.py            # Pipeline classes and orchestration
│   └── README.md          # Detailed component documentation
├── pyproject.toml         # Project configuration and dependencies
├── uv.lock               # Dependency lock file
└── README.md             # This file
```

## Dependencies

- `langchain_openai`: OpenAI integration
- `langchain`: Core framework
- `langchain_community`: Community components
- `python-dotenv`: Environment variable management

## Design Principles

- **Modularity**: Each component has a single, well-defined responsibility
- **Extensibility**: Pipeline stages can be added, removed, or modified
- **Reliability**: Error handling and graceful degradation
- **Performance**: Optimized for minimal API calls and latency
