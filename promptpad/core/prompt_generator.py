"""
Prompt generation component for creating comprehensive base prompts
"""

from typing import Dict
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence


class PromptGenerator:
    """Generates comprehensive base prompts from intent and context."""
    
    PROMPT_TEMPLATE = """You are an expert prompt engineer specializing in creating comprehensive, detailed prompts.

Using the interpreted intent and context analysis below, generate a robust, in-depth prompt that includes:

1. Clear role definition for the AI
2. Detailed task description with specific requirements
3. Context and background information
4. Expected output format and structure
5. Quality criteria and evaluation standards
6. Examples or references if applicable
7. Constraints and limitations to consider

Interpreted Intent:
{intent}

Context Analysis:
{context_analysis}

Generate a comprehensive prompt that will produce high-quality, detailed results:"""
    
    def __init__(self, llm):
        """Initialize the prompt generator with an LLM instance."""
        prompt = PromptTemplate(input_variables=["intent", "context_analysis"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def generate(self, intent: str, context_analysis: Dict[str, str]) -> str:
        """
        Generate a comprehensive base prompt from intent and context.
        
        Args:
            intent: The interpreted task intent
            context_analysis: Dictionary containing context analysis results
            
        Returns:
            Comprehensive base prompt
        """
        context_str = "\n".join([f"{k}: {v}" for k, v in context_analysis.items()])
        result = self.chain.invoke({"intent": intent, "context_analysis": context_str})
        return result.strip() 