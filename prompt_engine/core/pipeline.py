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
    
    def _validate_platform(self, platform: str) -> str:
        """
        Validate the platform parameter.
        
        Args:
            platform: The platform to validate
            
        Returns:
            The validated platform string
            
        Raises:
            ValueError: If platform is not valid
        """
        if platform not in PlatformTemplates.PLATFORMS:
            raise ValueError(f"Invalid platform '{platform}'. Valid options: {', '.join(PlatformTemplates.PLATFORMS)}")
        return platform
    
    def _setup_context(self, user_input: str, platform: str) -> Dict[str, Any]:
        """
        Set up the context analysis with platform information.
        
        Args:
            user_input: The raw user input to process
            platform: The target platform for customization
            
        Returns:
            Dictionary containing the context analysis
        """
        # Get platform context
        platform_context = PlatformTemplates.get_platform_context(platform)
        
        # Analyze context with platform consideration
        context_analysis = self.context_analyzer.analyze(user_input)
        context_analysis["platform"] = platform
        context_analysis["platform_context"] = platform_context
        
        return context_analysis
    
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
            platform = self._validate_platform(platform)
            
            # Set up context analysis
            context_analysis = self._setup_context(user_input, platform)
            platform_context = context_analysis["platform_context"]
            
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
                "platformContext": platform_context,
                "contextAnalysis": context_analysis,
                "intent": intent,
                "basePrompt": base_prompt,
                "enhancedPrompt": enhanced_prompt,
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

    def stream(self, user_input: str, platform: str = "Blog"):
        """
        Stream the prompt generation process.
        
        Args:
            user_input: The raw user input to process
            platform: The target platform for customization (default: "Blog")
            
        Yields:
            String chunks of the generated prompt
        """
        try:
            # Validate platform
            platform = self._validate_platform(platform)
            
            # Set up context analysis
            context_analysis = self._setup_context(user_input, platform)
            
            yield f"Analyzing context for {platform}...\n"
            
            # Step 2: Extract intent
            intent = self.interpreter.interpret(user_input, context_analysis)
            yield f"Extracting intent...\n"
            
            # Step 3: Generate base prompt
            platform_template = PlatformTemplates.get_platform_prompt_template(platform, user_input)
            base_prompt = self.generator.generate(intent, context_analysis)
            base_prompt = platform_template + "\n\n" + base_prompt
            yield f"Generating base prompt...\n"
            
            # Step 4: Enhance prompt
            enhanced_prompt = self.enhancer.enhance(base_prompt, context_analysis)
            yield f"Enhancing prompt...\n"
            
            # Step 5: Refine prompt
            final_prompt = self.refiner.refine(enhanced_prompt)
            yield f"Refining prompt...\n"
            
            # Yield the final result
            yield f"\n=== Enhanced Prompt for {platform} ===\n\n"
            yield final_prompt
            
        except Exception as e:
            yield f"Error: {str(e)}\n" 