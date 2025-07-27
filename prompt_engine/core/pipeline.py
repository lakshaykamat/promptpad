"""
Main pipeline orchestrator for the PromptPad framework
"""

from typing import Dict, Any
from langchain_openai import OpenAI

from .context_analyzer import ContextAnalyzer
from .intent_interpreter import IntentInterpreter
from .prompt_generator import PromptGenerator
from .prompt_enhancer import PromptEnhancer
from .prompt_refiner import PromptRefiner
from .platform_templates import PlatformTemplates


class PromptPipeline:
    """Orchestrates the complete prompt generation pipeline."""
    
    def __init__(self, temperature: float = 0.2):
        """
        Initialize the pipeline with all components.
        
        Args:
            temperature: Temperature setting for the LLM (default: 0.2 for consistency)
        """
        self.llm = OpenAI(temperature=temperature)
        self.context_analyzer = ContextAnalyzer(self.llm)
        self.interpreter = IntentInterpreter(self.llm)
        self.generator = PromptGenerator(self.llm)
        self.enhancer = PromptEnhancer(self.llm)
        self.refiner = PromptRefiner(self.llm)
    
    def run(self, user_input: str, platform: str = "Blog") -> Dict[str, Any]:
        """
        Execute the complete prompt generation pipeline with platform customization.
        
        The pipeline consists of 5 stages:
        1. Analyze context and requirements
        2. Extract comprehensive intent
        3. Generate detailed base prompt
        4. Enhance with specificity and depth
        5. Refine for clarity and effectiveness
        
        Args:
            user_input: The raw user input to process
            platform: The target platform for customization (default: "Blog")
            
        Returns:
            Dictionary containing all pipeline results or error information
        """
        try:
            # Validate platform
            if platform not in PlatformTemplates.PLATFORMS:
                platform = "Blog"  # Default fallback
            
            # Get platform context
            platform_context = PlatformTemplates.get_platform_context(platform)
            
            # Create simple context for enhancement
            context_analysis = {
                "platform": platform,
                "platform_context": platform_context,
                "user_input": user_input
            }
            
            # Step 1: Analyze context with platform consideration
            context_analysis = self.context_analyzer.analyze(user_input)
            context_analysis["platform"] = platform
            context_analysis["platform_context"] = platform_context
            
            # Step 2: Extract comprehensive intent
            intent = self.interpreter.interpret(user_input, context_analysis)
            
            # Step 3: Generate detailed base prompt with platform template
            platform_template = PlatformTemplates.get_platform_prompt_template(platform, user_input)
            base_prompt = self.generator.generate(intent, context_analysis)
            base_prompt = platform_template + "\n\n" + base_prompt
            
            # Step 4: Enhance with depth and specificity
            enhanced_prompt = self.enhancer.enhance(base_prompt, context_analysis)
            
            # Step 5: Refine for final clarity and effectiveness
            final_prompt = self.refiner.refine(enhanced_prompt)
            
            return {
                "success": True,
                "input": user_input,
                "platform": platform,
                "platform_context": platform_context,
                "context_analysis": context_analysis,
                "intent": intent,
                "base_prompt": base_prompt,
                "enhanced_prompt": enhanced_prompt,
                "prompt": final_prompt
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "input": user_input,
                "platform": platform
            }
    
    def run_simple(self, user_input: str, platform: str = "Blog") -> Dict[str, Any]:
        """
        Execute pipeline and return only the final prompt.
        
        Args:
            user_input: The raw user input to process
            platform: The target platform for customization (default: "Blog")
            
        Returns:
            Dictionary containing only the final prompt or error information
        """
        result = self.run(user_input, platform)
        
        if result["success"]:
            return {
                "success": True,
                "input": result["input"],
                "platform": result["platform"],
                "prompt": result["prompt"]
            }
        else:
            return result 