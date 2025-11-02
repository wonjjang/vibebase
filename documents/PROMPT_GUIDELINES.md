# Prompt Guidelines for Claude

## Clear Instructions

### ✅ Good Examples
- "Create a React component for displaying line charts with TypeScript"
- "Write a function to validate user input for chart configuration"
- "Generate unit tests for the VibeChart class using Jest"

### ❌ Avoid
- "Make it better"
- "Fix this code"
- "Add some features"

## Context Provision

### Essential Context
- **Project Type**: Data visualization platform
- **Tech Stack**: React, TypeScript, Node.js, PostgreSQL
- **Code Style**: ESLint configuration, functional components
- **Target**: Modern browsers, responsive design

### Context Template
```
Project: Vibebase (data visualization platform)
Stack: React + TypeScript frontend, Node.js backend
Style: Functional components, hooks, TypeScript strict mode
Task: [specific request]
```

## Output Format Specification

### Code Requests
- Include TypeScript types
- Add JSDoc comments for public APIs
- Follow existing project structure
- Include error handling

### Documentation Requests
- Use markdown format
- Include code examples
- Add table of contents for long documents
- Use consistent heading structure

## Examples and Specifications

### Component Creation
```
Create a Chart component that:
- Accepts data prop with type ChartData[]
- Renders using Canvas API
- Handles resize events
- Exports as default
```

### API Development
```
Create an API endpoint that:
- Route: POST /api/charts
- Validates input using Joi
- Returns JSON response
- Includes error handling
```

## Tone and Style

- **Professional but approachable**
- **Concise explanations**
- **Focus on practical implementation**
- **Include reasoning for technical decisions**

## Common Patterns

### File Structure Requests
```
Create files following this structure:
src/
  components/
    Chart/
      Chart.tsx
      Chart.test.tsx
      Chart.types.ts
      index.ts
```

### Testing Requests
```
Write tests that cover:
- Happy path scenarios
- Error conditions
- Edge cases
- User interactions
```

## Restrictions

- No external dependencies without approval
- Follow existing code patterns
- Maintain TypeScript strict mode compliance
- Include accessibility considerations
- Ensure responsive design compatibility
