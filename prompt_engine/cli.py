#!/usr/bin/env python3
"""
Command-line interface entry point for PromptPad
"""

from dotenv import load_dotenv
from prompt_engine.cli.main import main

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    main() 