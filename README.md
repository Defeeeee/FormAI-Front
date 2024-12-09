# FōrmAI

FōrmAI is an AI-powered personal trainer that analyzes and corrects your gym exercises in real-time. This project aims to provide users with detailed feedback on their exercise form, helping them achieve their fitness goals safely and effectively.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)

## Overview

FōrmAI leverages machine learning to analyze videos of users performing exercises and provides feedback on their form. The platform supports various exercises, including squats and planks, and offers a user-friendly interface for uploading and viewing videos.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Defeeeee/FormAI-Front.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FormAI-Front
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Register a new account or log in with an existing account.
2. Navigate to the dashboard to upload videos of your exercises.
3. View the analysis and feedback provided by the AI.
4. Check your video history to track your progress over time.

## API Endpoints

The following API endpoints are available for interacting with the backend:

### Users

- `POST /usuarios/register`: Register a new user.
- `POST /usuarios/login`: Authenticate a user.
- `GET /usuarios/:id`: Get user information by ID (admin).
- `PUT /usuarios/:id`: Update user information (authenticated user).
- `DELETE /usuarios/:id`: Delete a user (admin).
- `POST /usuarios/promote/:id`: Promote a user to admin (admin).

### Exercises

- `GET /ejercicios`: Get all exercises (admin).
- `POST /ejercicios`: Create a new exercise (admin).
- `GET /ejercicios/:id`: Get exercise information by ID (admin).
- `PUT /ejercicios/:id`: Update exercise information (admin).
- `DELETE /ejercicios/:id`: Delete an exercise (admin).

### Videos

- `GET /videos`: Get all videos (admin).
- `POST /videos`: Upload a new video (authenticated user).
- `GET /videos/:id`: Get video information by ID (admin).
- `DELETE /videos/:id`: Delete a video (admin).
- `GET /videos/usuario/:id`: Get videos of a specific user (authenticated user).

## Development Setup

To set up the development environment, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Make changes to the code and test them locally.
6. Commit your changes and push them to the repository.

## Contribution Guidelines

We welcome contributions from the community! To contribute to the project, follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure they are well-documented.
3. Test your changes thoroughly.
4. Submit a pull request with a clear description of your changes.

Thank you for contributing to FōrmAI!
