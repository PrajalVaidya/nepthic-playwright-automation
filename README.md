# Nepthic Playwright Automation

Industry-standard Playwright test automation framework with comprehensive structure and best practices.

## Project Structure

```
nepthic-playwright-automation/
├── src/
│   ├── pages/              # Page Object Models
│   ├── tests/              # Test files
│   ├── fixtures/           # Test fixtures and setup
│   ├── utils/              # Utility functions
│   └── data/               # Test data files
├── config/                 # Configuration files
├── reports/                # Test reports
├── .github/
│   └── workflows/          # CI/CD workflows
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests for specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run mobile tests
npm run test:mobile

# Run tests with specific tag
npm run test:single
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Viewing Reports

```bash
npm run report
```

## Best Practices

- Use Page Object Model pattern for maintainability
- Organize tests by feature/functionality
- Use meaningful test names with tags for categorization
- Implement reusable fixtures for common setup
- Keep test data in separate data files
- Use utility functions for common operations
- Implement proper error handling and logging
- Run tests in parallel for faster feedback

## Configuration

See `playwright.config.ts` for detailed configuration options including:

- Browser selection
- Retry logic
- Screenshots and videos
- HTML reports
- Trace collection

## Contributing

Follow the project structure and naming conventions when adding new tests or pages.
