# URL Shortener
![Project Demo](https://github.com/SNIGDHA-PANDEY/URLShortener/blob/master/0601753b-a43c-4053-8795-08495ef96442.gif)
## Overview

This URL Shortener is a full-stack application that allows users to shorten long URLs for easier sharing and management. Built with React, Node.js, Express, PostgreSQL, and Redis, it offers a fast and responsive way to handle URL redirection.

## Features

- **URL Shortening**: Convert long URLs into shorter, more manageable ones.
- **Quick Redirection**: Redirect to original URLs using their shortened versions.
- **Caching with Redis**: Enhances performance by caching frequently accessed URLs.
- **Responsive UI**: A clean and user-friendly interface.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker (for running PostgreSQL and Redis using Docker Compose)

#### Clone the Repository

git clone https://github.com/your-username/URLShortener.git
cd URLShortener

## Backend Setup

Navigate to the backend directory and install dependencies:

- cd url-shortener-backend
- npm install

## Frontend Setup
In a new terminal, navigate to the frontend directory and install dependencies:

- cd url-shortener-frontend
- npm install

## Environment Configuration
Set up your environment variables:

Create a .env file in the backend directory.
Add the following variables (adjust the values based on your setup):

- DATABASE_URL=postgresql://username:password@localhost:5432/url_shortener
- REDIS_URL=redis://localhost:6379

## Docker Deployment
Use Docker Compose to run PostgreSQL, Redis, and the backend service:

docker-compose up -d

## Usage
After starting the application, navigate to http://localhost:3001 in your browser. Enter a URL to shorten and use the provided short link for redirection.

