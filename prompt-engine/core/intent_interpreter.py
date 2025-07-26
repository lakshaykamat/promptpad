"""
Intent interpretation component for extracting comprehensive task understanding
"""

from typing import Dict
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence


class IntentInterpreter:
    """Extracts comprehensive task intent from user input with context."""
    
    PROMPT_TEMPLATE = """You are an expert at extracting clear, detailed task intent.

Given the user input and context analysis below, provide a comprehensive interpretation of the task intent that includes:
- The primary objective
- Secondary goals or considerations
- Specific constraints or requirements
- Expected outcomes

User Input:
{user_input}

Context Analysis:
{context_analysis}

Provide a detailed interpretation that captures the full scope and nuance of the request:"""
    
    def __init__(self, llm):
        """Initialize the intent interpreter with an LLM instance."""
        prompt = PromptTemplate(input_variables=["user_input", "context_analysis"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def interpret(self, user_input: str, context_analysis: Dict[str, str]) -> str:
        """
        Extract comprehensive intent from user input with context.
        
        Args:
            user_input: The raw user input
            context_analysis: Dictionary containing context analysis results
            
        Returns:
            Detailed interpretation of the task intent
        """
        context_str = "\n".join([f"{k}: {v}" for k, v in context_analysis.items()])
        result = self.chain.invoke({"user_input": user_input, "context_analysis": context_str})
        return result.strip() 