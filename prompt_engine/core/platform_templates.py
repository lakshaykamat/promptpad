"""
Platform-specific prompt templates for different social media and content platforms
"""

from typing import Dict, Any

class PlatformTemplates:
    """Contains platform-specific prompt customization templates."""
    
    PLATFORMS = {
        "Twitter": "twitter",
        "LinkedIn": "linkedin", 
        "YouTube": "youtube",
        "Blog": "blog",
        "Email": "email",
        "ChatGPT": "chatgpt",
        "Cursor": "cursor"
    }
    
    @staticmethod
    def get_platform_context(platform: str) -> Dict[str, Any]:
        """
        Get platform-specific context and requirements.
        
        Args:
            platform: The selected platform
            
        Returns:
            Dictionary with platform-specific context
        """
        templates = {
            "Twitter": {
                "character_limit": 280,
                "tone": "concise, engaging, conversational",
                "format": "short, punchy, hashtag-friendly",
                "purpose": "quick engagement and viral potential",
                "style_guide": "Use emojis sparingly, include relevant hashtags, keep it conversational"
            },
            "LinkedIn": {
                "character_limit": 3000,
                "tone": "professional, authoritative, thought leadership",
                "format": "structured, professional, industry-focused",
                "purpose": "professional networking and thought leadership",
                "style_guide": "Professional tone, industry insights, avoid excessive emojis, use bullet points for clarity"
            },
            "YouTube": {
                "character_limit": 5000,
                "tone": "entertaining, educational, engaging",
                "format": "video script format with hooks and calls-to-action",
                "purpose": "video content creation and audience engagement",
                "style_guide": "Include hooks, timestamps, calls-to-action, engaging questions"
            },
            "Blog": {
                "character_limit": 2000,
                "tone": "informative, detailed, SEO-friendly",
                "format": "article format with headings and structure",
                "purpose": "in-depth content and SEO optimization",
                "style_guide": "Use headings, include keywords naturally, provide value, encourage engagement"
            },
            "Email": {
                "character_limit": 1000,
                "tone": "professional, clear, action-oriented",
                "format": "email format with greeting and signature",
                "purpose": "professional communication and action",
                "style_guide": "Clear subject line, professional greeting, concise content, clear call-to-action"
            },
            "ChatGPT": {
                "character_limit": 4000,
                "tone": "conversational, helpful, detailed",
                "format": "conversational prompt format",
                "purpose": "AI interaction and detailed responses",
                "style_guide": "Be specific, provide context, ask follow-up questions, use clear instructions"
            },
            "Cursor": {
                "character_limit": 4000,
                "tone": "technical, precise, development-focused",
                "format": "coding prompt format",
                "purpose": "software development and coding assistance",
                "style_guide": "Specify programming language, include requirements, provide context, ask for explanations"
            }
        }
        
        return templates.get(platform, templates["Blog"])
    
    @staticmethod
    def get_platform_prompt_template(platform: str, user_input: str) -> str:
        """
        Generate platform-specific prompt template.
        
        Args:
            platform: The selected platform
            user_input: The user's original input
            
        Returns:
            Platform-specific prompt template
        """
        context = PlatformTemplates.get_platform_context(platform)
        
        templates = {
            "Twitter": f"""You are a social media expert. Create a Twitter post about {user_input}. Make it engaging, shareable, and optimized for Twitter's algorithm. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "LinkedIn": f"""You are a professional thought leader. Create a LinkedIn post about {user_input}. Demonstrate thought leadership and provide valuable insights. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "YouTube": f"""You are a YouTube content creator. Create a YouTube video script about {user_input}. Include a compelling hook, clear structure, engaging content, and strong call-to-action for viewers. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "Blog": f"""You are a professional blogger. Create a blog post about {user_input}. Structure with clear headings, provide valuable insights, and optimize for SEO. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "Email": f"""You are a professional email writer. Create a professional email about {user_input}. Include a clear subject line, appropriate greeting, concise content, and effective call-to-action. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "ChatGPT": f"""You are an AI prompt expert. Create a detailed, specific prompt about {user_input}. Make it specific, detailed, and designed to get the best response from ChatGPT. Include context, clear instructions, and desired output format. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}""",

            "Cursor": f"""You are a software developer. Create a coding solution for {user_input}. Specify the programming language, include specific requirements, provide context, and give clear implementation guidelines. Keep it under {context['character_limit']} characters with a {context['tone']} tone. {context['style_guide']}"""
        }
        
        return templates.get(platform, templates["Blog"])
    
    @staticmethod
    def enhance_for_platform(platform: str, base_prompt: str) -> str:
        """
        Enhance a base prompt with platform-specific optimizations.
        
        Args:
            platform: The selected platform
            base_prompt: The base prompt to enhance
            
        Returns:
            Platform-enhanced prompt
        """
        context = PlatformTemplates.get_platform_context(platform)
        
        enhancements = {
            "Twitter": f"\n\nOptimize this for Twitter:\n- Keep under {context['character_limit']} characters\n- Make it shareable and engaging\n- Include relevant hashtags\n- Use conversational tone",
            
            "LinkedIn": f"\n\nOptimize this for LinkedIn:\n- Professional tone and structure\n- Include industry insights\n- Encourage professional discussion\n- Use bullet points for clarity",
            
            "YouTube": f"\n\nOptimize this for YouTube:\n- Include engaging hook\n- Add timestamps for key points\n- Include call-to-action for subscribers\n- Make it visually descriptive",
            
            "Blog": f"\n\nOptimize this for Blog:\n- Add SEO-friendly headings\n- Include relevant keywords\n- Structure for readability\n- Encourage reader engagement",
            
            "Email": f"\n\nOptimize this for Email:\n- Add professional greeting and signature\n- Clear subject line suggestion\n- Concise and actionable content\n- Professional tone throughout",
            
            "ChatGPT": f"\n\nOptimize this for ChatGPT:\n- Be specific and detailed\n- Include context and background\n- Ask for explanations and examples\n- Structure for best AI response",
            
            "Cursor": f"\n\nOptimize this for Cursor:\n- Specify programming language and context\n- Include technical requirements\n- Ask for code explanations\n- Provide clear implementation guidelines"
        }
        
        enhancement = enhancements.get(platform, "")
        return base_prompt + enhancement 