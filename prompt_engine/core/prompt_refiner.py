"""
Prompt refinement component for final clarity and effectiveness
"""

from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence


class PromptRefiner:
    """Refines prompts for final clarity, precision, and effectiveness."""
    
    PROMPT_TEMPLATE = """You are an expert prompt refiner focused on clarity, precision, and effectiveness.

Refine the following prompt to ensure it is:
1. Crystal clear and unambiguous
2. Optimally structured for LLM processing
3. Free of redundancy and unnecessary complexity
4. Balanced between detail and conciseness
5. Professional and well-formatted
6. Ready for immediate use

Prompt to Refine:
{prompt}

Provide the final refined version that maintains all essential information while being polished and professional:"""
    
    def __init__(self, llm):
        """Initialize the prompt refiner with an LLM instance."""
        prompt = PromptTemplate(input_variables=["prompt"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def refine(self, prompt: str) -> str:
        """
        Refine prompt for final clarity and effectiveness.
        
        Args:
            prompt: The prompt to refine
            
        Returns:
            Refined prompt optimized for clarity and effectiveness
        """
        result = self.chain.invoke({"prompt": prompt})
        return result.strip() 