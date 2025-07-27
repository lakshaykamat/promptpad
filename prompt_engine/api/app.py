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

    # Configure Flask to handle large responses
    app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB limit
    app.config['JSON_AS_ASCII'] = False  # Allow non-ASCII characters

    CORS(app)  # Allow CORS for all routes and all origins

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
            if not data:
                return jsonify({
                    "success": False,
                    "error": "Request body must be valid JSON"
                }), 400

            if 'input' not in data:
                return jsonify({
                    "success": False,
                    "error": "Missing 'input' field in request body"
                }), 400

            if 'platform' not in data:
                return jsonify({
                    "success": False,
                    "error": "Missing 'platform' field in request body"
                }), 400

            user_input = data['input'].strip()
            platform_input = data['platform'].strip()

            if not user_input:
                return jsonify({
                    "success": False,
                    "error": "Input cannot be empty"
                }), 400

            if not platform_input:
                return jsonify({
                    "success": False,
                    "error": "Platform cannot be empty"
                }), 400

            valid_platforms = ["Twitter", "LinkedIn", "YouTube", "Blog", "Email", "ChatGPT", "Cursor"]
            if platform_input not in valid_platforms:
                return jsonify({
                    "success": False,
                    "error": f"Invalid platform. Valid options are: {', '.join(valid_platforms)}"
                }), 400

            # Generate the enhanced prompt
            result = pipeline.run(user_input, platform_input)

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
                    "body": {
                        "input": "your prompt or instruction",
                        "platform": "Twitter | LinkedIn | YouTube | Blog | Email | ChatGPT | Cursor (required)"
                    },
                    "response": {
                        "success": True,
                        "output": "Enhanced prompt optimized for the selected platform"
                    }
                }
            }
        })

    return app