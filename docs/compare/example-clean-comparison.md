---
title: AI Model Comparison Example
layout: Clean
---

<ChatComparison
  title="Which AI is better for coding?"
  prompt="Write a Python function to calculate the factorial of a number"
  :responses="responses"
  publishedDate="2:30 PM"
/>

<script setup>
const responses = {
  'ChatGPT': `Here is a Python function to calculate the factorial of a number:

\`\`\`python
def factorial(n):
    if n < 0:
        return "Error: Factorial not defined for negative numbers"
    elif n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result
\`\`\`

This iterative approach is efficient and handles edge cases.`,
  'Claude': `I will provide you with a Python factorial function:

\`\`\`python
def factorial(n):
    """Calculate the factorial of a non-negative integer."""
    if not isinstance(n, int) or n < 0:
        raise ValueError("Input must be a non-negative integer")
    
    if n <= 1:
        return 1
    
    return n * factorial(n - 1)
\`\`\`

This recursive solution includes input validation and documentation.`,
  'Gemini': `Here is how to calculate factorial in Python:

\`\`\`python
import math

def factorial(n):
    # Using Python built-in math.factorial for optimal performance
    try:
        return math.factorial(n)
    except (ValueError, TypeError):
        return f"Invalid input: {n}. Please provide a non-negative integer."
\`\`\`

This leverages Python optimized built-in function for best performance.`
}
</script>