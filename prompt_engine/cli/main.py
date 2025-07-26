"""
Command-line interface for PromptPad
"""

import sys
from prompt_engine.core import PromptPipeline
from prompt_engine.config import Settings


def main():
    """Main CLI entry point."""
    try:
        # Check if prompt was provided
        if len(sys.argv) < 2:
            print("Usage: promptpad <your prompt>")
            print("Example: promptpad 'Write a blog post about AI'")
            sys.exit(1)
        
        # Get the prompt from command line arguments
        user_prompt = " ".join(sys.argv[1:])
        
        # Load settings from environment
        settings = Settings()
        settings.validate()
        
        # Initialize pipeline with settings
        pipeline = PromptPipeline(temperature=settings.temperature)
        
        # Generate the prompt
        result = pipeline.run(user_prompt)
        
        # Display results
        if result["success"]:
            print(result["final_prompt"])
        else:
            print(f"Error: {result['error']}", file=sys.stderr)
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\nOperation cancelled by user", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main() 