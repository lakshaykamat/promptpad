"""
Context analysis component for understanding user input domain and requirements
"""

from typing import Dict
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence


class ContextAnalyzer:
    """Analyzes user input for context, domain, and requirements."""
    
    PROMPT_TEMPLATE = """You are an expert at analyzing user input for context, domain, and requirements.

Analyze the following user input and extract:
1. Domain/field (e.g., programming, writing, analysis, creative, technical)
2. Complexity level (beginner, intermediate, advanced)
3. Specific requirements or constraints
4. Expected output format or style
5. Key terminology or concepts involved

User Input:
{user_input}

Provide your analysis in this exact format:
Domain: [domain]
Complexity: [level]
Requirements: [list of requirements]
Output Format: [expected format]
Key Concepts: [relevant terms/concepts]"""
    
    def __init__(self, llm):
        """Initialize the context analyzer with an LLM instance."""
        prompt = PromptTemplate(input_variables=["user_input"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def analyze(self, user_input: str) -> Dict[str, str]:
        """
        Analyze user input for context and requirements.
        
        Args:
            user_input: The raw user input to analyze
            
        Returns:
            Dictionary containing domain, complexity, requirements, output format, and key concepts
        """
        result = self.chain.invoke({"user_input": user_input})
        return self._parse_analysis(result.strip())
    
    def _parse_analysis(self, analysis_text: str) -> Dict[str, str]:
        """
        Parse the analysis text into a structured dictionary.
        
        Args:
            analysis_text: Raw analysis text from LLM
            
        Returns:
            Structured dictionary of analysis results
        """
        lines = analysis_text.split('\n')
        analysis = {}
        for line in lines:
            if ':' in line:
                key, value = line.split(':', 1)
                analysis[key.strip()] = value.strip()
        return analysis 