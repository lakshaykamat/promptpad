"""
Prompt enhancement component for adding depth and specificity
"""

from typing import Dict
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence


class PromptEnhancer:
    """Enhances prompts with additional depth, specificity, and actionable instructions."""
    
    PROMPT_TEMPLATE = """You are an expert at enhancing prompts for maximum effectiveness and depth.

Enhance the following prompt by:
1. Adding specific, actionable instructions
2. Including relevant examples or templates
3. Specifying quality standards and evaluation criteria
4. Adding domain-specific terminology and best practices
5. Including error prevention and edge case handling
6. Adding formatting and structure requirements
7. Incorporating relevant constraints and limitations

Original Prompt:
{prompt}

Context Analysis:
{context_analysis}

Provide an enhanced version that is more comprehensive and actionable. DO NOT execute the prompt or generate content - only enhance the prompt itself:"""
    
    def __init__(self, llm):
        """Initialize the prompt enhancer with an LLM instance."""
        prompt = PromptTemplate(input_variables=["prompt", "context_analysis"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def enhance(self, prompt: str, context_analysis: Dict[str, str]) -> str:
        """
        Enhance prompt with additional depth and specificity.
        
        Args:
            prompt: The base prompt to enhance
            context_analysis: Dictionary containing context analysis results
            
        Returns:
            Enhanced prompt with additional depth and specificity
        """
        context_str = "\n".join([f"{k}: {v}" for k, v in context_analysis.items()])
        result = self.chain.invoke({"prompt": prompt, "context_analysis": context_str})
        return result.strip() 