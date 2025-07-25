"""
Flask application factory and routes for PromptPad API
"""

from flask import Flask, request, jsonify
from promptpad.core import PromptPipeline


def create_app() -> Flask:
    """
    Create and configure the Flask application.
    
    Returns:
        Configured Flask application
    """
    app = Flask(__name__)
    
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
        """Generate a complete prompt with all pipeline stages."""
        try:
            data = request.get_json()
            
            if not data or 'input' not in data:
                return jsonify({
                    "success": False,
                    "error": "Missing 'input' field in request body"
                }), 400
            
            user_input = data['input']
            
            if not user_input or not user_input.strip():
                return jsonify({
                    "success": False,
                    "error": "Input cannot be empty"
                }), 400
            
            # Generate the prompt
            result = pipeline.run(user_input.strip())
            
            if result['success']:
                return jsonify(result), 200
            else:
                return jsonify(result), 500
                
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
                    "body": {"input": "your prompt or instruction"},
                    "response": "Full pipeline results with all stages"
                }
            }
        })
    
    return app 