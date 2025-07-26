"""
Configuration settings for PromptPad
"""

import os
from typing import Optional


class Settings:
    """Application settings and configuration."""
    
    def __init__(self):
        """Initialize settings from environment variables."""
        # OpenAI Configuration
        self.openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY")
        
        # Server Configuration
        self.host: str = os.getenv("HOST", "0.0.0.0")
        self.port: int = int(os.getenv("PORT"))
        
        # LLM Configuration
        self.temperature: float = float(os.getenv("TEMPERATURE"))
        self.model_name: str = os.getenv("MODEL_NAME")
        
        # Application Configuration
        self.debug: bool = os.getenv("DEBUG", "false").lower() == "true"
        self.version: str = "1.0.0"
    
    def validate(self) -> bool:
        """
        Validate that required settings are present.
        
        Returns:
            True if all required settings are valid
        """
        if not self.openai_api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        
        if not (0 <= self.temperature <= 2):
            raise ValueError("TEMPERATURE must be between 0 and 2")
        
        if not (1 <= self.port <= 65535):
            raise ValueError("PORT must be between 1 and 65535")
        
        return True
    
    def to_dict(self) -> dict:
        """Convert settings to dictionary (excluding sensitive data)."""
        return {
            "host": self.host,
            "port": self.port,
            "temperature": self.temperature,
            "model_name": self.model_name,
            "debug": self.debug,
            "version": self.version
        } 