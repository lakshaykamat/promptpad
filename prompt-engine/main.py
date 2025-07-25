from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence

load_dotenv()

class IntentInterpreter:
    PROMPT_TEMPLATE = """You are an expert at extracting clear task intent.

Given the user input below, output ONLY a concise interpretation of the task intent in one sentence.

User Input:
{user_input}

Interpreted Intent:"""
    
    def __init__(self, llm):
        prompt = PromptTemplate(input_variables=["user_input"], template=self.PROMPT_TEMPLATE)
        # Create a RunnableSequence: prompt -> llm
        self.chain = RunnableSequence(prompt, llm)
    
    def interpret(self, user_input: str) -> str:
        """Extract concise intent from user input."""
        # invoke with dict input
        result = self.chain.invoke({"user_input": user_input})
        return result.strip()

class PromptGenerator:
    PROMPT_TEMPLATE = """You are a prompt engineer.

Using the interpreted intent below, generate a clear, specific prompt suitable for an LLM.

Interpreted Intent:
{intent}

Prompt:"""
    
    def __init__(self, llm):
        prompt = PromptTemplate(input_variables=["intent"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def generate(self, intent: str) -> str:
        """Generate a base prompt from intent."""
        result = self.chain.invoke({"intent": intent})
        return result.strip()

class PromptImprover:
    PROMPT_TEMPLATE = """You are an expert prompt improver.

Improve the following prompt for clarity, specificity, and effectiveness.

Only output the improved prompt text. Do NOT include any explanations or commentary.

Prompt:
{prompt}

Improved Prompt:"""
    
    def __init__(self, llm):
        prompt = PromptTemplate(input_variables=["prompt"], template=self.PROMPT_TEMPLATE)
        self.chain = RunnableSequence(prompt, llm)
    
    def improve(self, prompt: str) -> str:
        """Improve prompt quality silently."""
        result = self.chain.invoke({"prompt": prompt})
        return result.strip()

class PromptPipeline:
    def __init__(self, temperature: float = 0.3):
        self.llm = OpenAI(temperature=temperature)
        self.interpreter = IntentInterpreter(self.llm)
        self.generator = PromptGenerator(self.llm)
        self.improver = PromptImprover(self.llm)
    
    def run(self, user_input: str) -> str:
        """
        Complete pipeline:
        1. Extract intent
        2. Generate prompt from intent
        3. Improve prompt
        Returns improved prompt only.
        """
        try:
            intent = self.interpreter.interpret(user_input)
            base_prompt = self.generator.generate(intent)
            improved_prompt = self.improver.improve(base_prompt)
            return improved_prompt
        except Exception as e:
            return f"Error during prompt generation: {e}"

if __name__ == "__main__":
    pipeline = PromptPipeline()
    user_text = input("Enter your prompt or instruction: ")
    improved_prompt = pipeline.run(user_text)
    print(improved_prompt)
