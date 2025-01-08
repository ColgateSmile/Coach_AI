# Running AI Coach

Welcome to **Running AI Coach**, your personal AI-powered running assistant! This web application helps runners analyze their performance, generate personalized training plans, and suggest running competitions worldwide. Built with React, Bootstrap, and powered by the OpenAI API, this app is designed to make your running journey smarter and more efficient.

## Features
- **Personalized Training Plans**: Get a customized training plan based on your age, weight, resting heart rate, recent run times, and goal distance.
- **Goal-Oriented Plans**: Specify your goal distance (e.g., 5k, 10k, half marathon, marathon) and target time to receive a tailored plan.
- **Download your training plan**: easy download the plan as a csv or a pdf.
- **Dynamic Plan Duration**: The app calculates the optimal training plan duration based on your current fitness level.
- **Professional Design**: A clean, responsive, and modern UI built with Bootstrap.
- **Running News**: Stay updated with the latest running news *(coming soon!).*
- **Diet Plan Integration**: Get personalized diet plans to complement your training *(coming soon!).*

## Screenshots 


![ReactApp-GoogleChrome2025-01-0523-45-27-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/7224f49f-e185-4cd8-9aa0-d4935deb4c13)




![image](https://github.com/user-attachments/assets/cddcd201-5f8e-4e02-b87b-e42e764123bf)


## Technologies Used 
- **Frontend**: React, Bootstrap
- **Backend**: OpenAI API
- **Routing**: React Router
- **Environment Management**: `.env` files
- **Version Control**: Git, GitHub

## Getting Started 
Follow these steps to set up and run the Running AI Coach app locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ColgateSmile/Coach_AI.git
cd Coach_AI
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:

```env
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. Run the app:

```bash
npm start
```

5. Open the app:
   - Visit `http://localhost:3000` in your browser.

## Usage 

### Enter Your Details:
- Fill in your age, weight, resting heart rate, recent run time, goal distance, and goal time.

### Generate Training Plan:
- Click **Analyze My Data** to generate a personalized training plan.

### View Results:
- The training plan will be displayed in a table format, organized by weeks and days.

## Project Structure
```plaintext
/running-chat-app
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx       # Footer with links
│   │   ├── UserDataForm.jsx # User input form
│   │   └── Results.jsx      # Training plan table
│   ├── pages/               # Placeholder pages
│   │   ├── Home.jsx         # Home page
│   │   ├── Chat.jsx         # Chat interface (coming soon)
│   │   ├── DietPlan.jsx     # Diet plan page (coming soon)
│   │   └── RunningNews.jsx  # Running news page (coming soon)
│   ├── App.jsx              # Main app component
│   ├── index.js             # Entry point
│   └── App.css              # Global styles
├── .env                     # Environment variables
├── .gitignore               # Files to ignore in Git
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Contributing 
Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request.
