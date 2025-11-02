# Claude Project Rules - Vibebase

## Project Context
- **Name**: Vibebase
- **Type**: Data visualization and analytics platform
- **Tech Stack**: React + TypeScript (frontend), Node.js (backend), PostgreSQL (database)
- **Purpose**: Interactive charts, real-time dashboards, data analytics

## Language & Communication
- **Primary Language**: English for code and documentation
- **Code Comments**: English, clear and concise
- **Variable Names**: camelCase, descriptive
- **File Names**: PascalCase for components, camelCase for utilities

## Code Style Rules

### TypeScript
- Use strict mode
- Explicit return types for functions
- Interface over type for object definitions
- Prefer functional components with hooks

### React Patterns
```typescript
// Preferred component structure
interface ChartProps {
  data: ChartData[];
  type: ChartType;
  onUpdate?: (data: ChartData[]) => void;
}

export const Chart: React.FC<ChartProps> = ({ data, type, onUpdate }) => {
  // Implementation
};
```

### File Organization
```
src/
  components/
    Chart/
      Chart.tsx
      Chart.test.tsx
      Chart.types.ts
      index.ts
```

## Output Format Standards

### Code Blocks
- Always include TypeScript types
- Add JSDoc for public APIs
- Include error handling
- Follow existing patterns

### Documentation
- Use markdown format
- Include practical examples
- Add table of contents for long docs
- Consistent heading structure

## Restrictions
- No external dependencies without explicit approval
- Maintain accessibility standards (WCAG 2.1)
- Ensure responsive design compatibility
- Follow security best practices
- Include unit tests for new features

## Default Assumptions
- Target modern browsers (ES2020+)
- Mobile-first responsive design
- Real-time data capabilities required
- Performance optimization is priority
- User experience over technical complexity

## Error Handling Pattern
```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  // User-friendly error handling
}
```

## Testing Requirements
- Jest for unit tests
- React Testing Library for component tests
- Minimum 80% code coverage
- Test user interactions and edge cases
