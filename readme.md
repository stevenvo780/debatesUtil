# Debate Moderator Application

This project is a web-based application to manage and moderate debates. It allows moderators to track participant times, manage rounds, and apply penalties. The application is built using HTML, CSS (Bootstrap), and JavaScript.

---

## Features

- **Participant Management**: Add, edit, and remove participants with their initial speaking times.
- **Timer Tracking**: Real-time countdown timers for each participant.
- **Round Management**: Switch between rounds and adjust participant times for each round.
- **Penalty Tracking**: Apply penalties to participants as needed.
- **Statistics Overview**: View a summary of total speaking times and penalties for each participant.
- **Persistent Storage**: Save session data locally using `localStorage`.
- **Responsive Design**: Works well across various screen sizes using Bootstrap.

---

## Setup

No installation is required to run this application. Simply open the `index.html` file in any modern web browser.

---

## How to Use

1. **Add Participants**:
   - Enter the participant's name and their initial speaking time (in minutes).
   - Click the "Add Participant" button to add them to the list.

2. **Start Timer**:
   - Click on a participant card to start or stop their timer.

3. **Manage Rounds**:
   - Adjust the current round using the "Round" input.
   - Click "New Round" to increment the round number and reset participant times.
   - Use "Change All" to update all participants' speaking times globally.

4. **Penalties**:
   - Use the "+" button on a participant's card to apply penalties.

5. **Statistics**:
   - Click "Show Stats" to view a modal with each participant's total time used and penalties.

6. **Edit Participants**:
   - Click the pencil icon on a participant card to edit their name or initial time.

7. **Reset All Data**:
   - Click the "Reset All" button to clear all session data.

---

## Code Overview

- **HTML**: Provides the structure of the application, including forms, modals, and participant cards.
- **CSS**: Includes Bootstrap for styling and custom styles for layout enhancements.
- **JavaScript**:
  - **Data Management**: Tracks participants, rounds, and timers in a `data` object.
  - **Local Storage**: Saves and loads session data to/from the browser's `localStorage`.
  - **Timer Logic**: Updates participant timers every second and handles session tracking.
  - **Dynamic Rendering**: Updates participant cards and active timer displays dynamically.

---

## Customization

To customize the application:

1. **Style**: Modify the `<style>` section in the `<head>` or add custom CSS.
2. **Logic**: Update JavaScript functions to change the behavior.
3. **Bootstrap**: Adjust styles using Bootstrap classes or include additional components.

---

## Known Issues

- Data is stored locally and will not persist across devices or browsers.
- Rapid toggling of timers may cause slight discrepancies in recorded times.

---

## Future Improvements

- Implement server-side storage for shared access and persistent data.
- Add sound notifications for timer completions or penalties.
- Enhance UI/UX with animations or more intuitive controls.

---

## Dependencies

- [Bootstrap 5.3](https://getbootstrap.com/): CSS framework for styling and layout.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it as you wish.
