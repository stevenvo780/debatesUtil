# Debate Orchestrator

Debate Orchestrator is a professional and free tool designed for managing and moderating competitive, academic, and school debates. It provides time control, automatic moderation, real-time statistics, and a user-friendly interface.

## Key Features

- Time control for speakers.
- Automatic turn management.
- Penalty system.
- Real-time statistics.
- Multiple debate rounds.
- Multilingual interface (Spanish/English).
- Customizable times for each participant.
- Statistics export.
- Professional moderation for various debate formats.

## Prerequisites

- Node.js >= 18.
- npm >= 8.
- Modern browser with JavaScript enabled.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/youruser/debate-moderator.git
   cd debate-moderator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm start
```

Access the app at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Runs the tests.
- `npm eject`: Ejects CRA (Create React App) configurations.
- `npm run dev`: Runs multiple processes concurrently (via `concurrently`).

## Project Structure

```plaintext
.
├── public
│   ├── index.html          # Base HTML file
│   └── favicon.ico         # App icon
├── src
│   ├── components          # Reusable components
│   ├── hooks               # Custom hooks
│   ├── store               # Redux Toolkit configuration
│   ├── translations        # Multilingual translations
│   ├── App.js              # Main component
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Main Dependencies

- **React**: Library for building user interfaces.
- **Redux Toolkit**: Centralized state management.
- **Bootstrap**: CSS framework for responsive design.
- **react-bootstrap**: React components based on Bootstrap.
- **redux-persist**: State persistence for Redux.

## Development Dependencies

- **concurrently**: Run multiple commands concurrently.

## Multilingual Support

The project supports two languages:

- **Spanish** (es).
- **English** (en).

You can toggle between languages using the language switcher button on the interface.

## Usage

### Adding Participants
1. Enter the participant's name in the form.
2. Define the initial time assigned to the participant.
3. Click "Add Participant."

### Time Control
- Start or pause the global timer.
- Manage individual participant times.
- Penalize participants as needed.

### Statistics
Access a summary of each participant's time usage and penalties in real-time.

### Customization
- Adjust times for each participant.
- Set up customized rounds with specific times.

## Contribution

1. Fork the repository.
2. Create a new branch for your changes:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit with descriptive messages.
4. Submit a pull request with your changes.

## SEO and Social Media

The project includes configurations for improved SEO and social sharing:

- **Meta Tags**: Detailed descriptions and keywords.
- **Open Graph**: Facebook and Twitter compatibility.
- **Structured Data**: JSON-LD for better search engine rankings.

## Deployment

This app can be deployed easily on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for using Debate Orchestrator! If you have questions or suggestions, feel free to open an issue in the repository.
