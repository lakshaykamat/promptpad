#!/usr/bin/env python3
"""
Main entry point for PromptPad Flask application
Supports both development and production modes
"""

import os
from dotenv import load_dotenv
from prompt_engine.api import create_app
from prompt_engine.config import Settings

# Load environment variables
load_dotenv()

def main():
    """Main application entry point."""
    # Load and validate settings
    settings = Settings()
    settings.validate()
    
    # Create Flask application
    app = create_app()
    
    # Determine if we're in production mode
    is_production = os.environ.get("PRODUCTION", "false").lower() == "true"
    
    # Run the application
    app.run(
        host=settings.host,
        port=settings.port,
        debug=settings.debug and not is_production  # Disable debug in production
    )

if __name__ == "__main__":
    main() 