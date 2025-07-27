"""
Flask application factory and routes for PromptPad API
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from prompt_engine.core import PromptPipeline


def create_app() -> Flask:
    """
    Create and configure the Flask application.
    
    Returns:
        Configured Flask application
    """
    app = Flask(__name__)

    CORS(app)  # This will allow CORS for all routes and all origins
    
    # Initialize the pipeline
    pipeline = PromptPipeline()
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint."""
        return jsonify({
            "status": "healthy",
            "service": "promptpad",
            "version": "1.0.0"
        })
    
    @app.route('/generate', methods=['POST'])
    def generate_prompt():
        """Generate an enhanced prompt optimized for the selected platform."""
        try:
            data = request.get_json()
            
            if not data or 'input' not in data:
                return jsonify({
                    "success": False,
                    "error": "Missing 'input' field in request body"
                }), 400
            
            user_input = data['input']
            platform = data.get('platform', 'Blog')  # Default to Blog if not specified
            
            if not user_input or not user_input.strip():
                return jsonify({
                    "success": False,
                    "error": "Input cannot be empty"
                }), 400
            
            # Validate platform
            valid_platforms = ["Twitter", "LinkedIn", "YouTube", "Blog", "Email", "ChatGPT", "Cursor"]
            if platform not in valid_platforms:
                platform = "Blog"  # Default fallback
            
            # Generate the enhanced prompt with platform customization
            result = pipeline.run_simple(user_input.strip(), platform)
            
            if result['success']:
                return jsonify(result), 200
            else:
                return jsonify(result), 500
                
        except Exception as e:
            return jsonify({
                "success": False,
                "error": f"Internal server error: {str(e)}"
            }), 500

    @app.route('/execute', methods=['POST'])
    def execute_prompt():
        """Execute a prompt and return the AI-generated response."""
        try:
            data = request.get_json()
            
            if not data or 'prompt' not in data:
                return jsonify({
                    "success": False,
                    "error": "Missing 'prompt' field in request body"
                }), 400
            
            prompt = data['prompt']
            
            if not prompt or not prompt.strip():
                return jsonify({
                    "success": False,
                    "error": "Prompt cannot be empty"
                }), 400
            
            # Execute the prompt using the LLM
            try:
                response = pipeline.llm.invoke(prompt.strip())
                ai_response = response.content if hasattr(response, 'content') else str(response)
                
                return jsonify({
                    "success": True,
                    "prompt": prompt,
                    "response": ai_response,
                    "execution_time": "completed"
                }), 200
                
            except Exception as llm_error:
                return jsonify({
                    "success": False,
                    "error": f"LLM execution failed: {str(llm_error)}"
                }), 500
                
        except Exception as e:
            return jsonify({
                "success": False,
                "error": f"Internal server error: {str(e)}"
            }), 500
    
    @app.route('/', methods=['GET'])
    def root():
        """Root endpoint with API documentation."""
        return jsonify({
            "service": "PromptPad API",
            "version": "1.0.0",
            "description": "A microservice for generating robust and in-depth prompts",
            "endpoints": {
                "GET /": "API documentation",
                "GET /health": "Health check",
                "POST /generate": "Generate full prompt with all stages"
            },
            "usage": {
                "POST /generate": {
                    "body": {
                        "input": "your prompt or instruction",
                        "platform": "Twitter | LinkedIn | YouTube | Blog | Email | ChatGPT | Cursor (optional, defaults to Blog)"
                    },
                    "response": "Enhanced prompt optimized for the selected platform"
                },
                "POST /execute": {
                    "body": {
                        "prompt": "the prompt to execute"
                    },
                    "response": "AI-generated response to the prompt"
                }
            }
        })
    
    return app 