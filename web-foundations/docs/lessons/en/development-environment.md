---
layout: lesson
title: Development Environment
title_en: Development Environment
author: 'Rubén Vega Balbás, PhD'
lang: en
slug: development-environment
date: 2025-01-15T00:00:00.000Z
source: docs/lessons/es/development-environment.md
---

# Development Environment Setup

In this lesson, you'll learn how to set up your development environment for the WEB ATELIER (UDIT) course.

## Required Tools

### 1. Code Editor

- **Visual Studio Code** (recommended)
- **Sublime Text**
- **Atom** (discontinued but still functional)

### 2. Version Control

- **Git** - Version control system
- **GitHub** - Code hosting platform

### 3. Web Browser

- **Firefox Developer Edition** (recommended for development)
- **Chrome DevTools**
- **Safari** (for testing on macOS)

## GitHub Setup

### Create an Account

1. Go to [github.com](https://github.com)
2. Create an account with your UDIT email
3. Verify your email

### Configure Git Locally

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@udit.es"
```

### Generate SSH Key (Optional but Recommended)

```bash
ssh-keygen -t ed25519 -C "your-email@udit.es"
```

## Recommended VS Code Extensions

- **Live Server** - Local development server
- **HTML CSS Support** - Enhanced autocompletion
- **Prettier** - Automatic code formatting
- **GitLens** - Git enhancements
- **axe Accessibility Linter** - Accessibility checking

## Project Structure

Your project will follow this structure:

```
my-web-project/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── images/
├── project.yaml
├── project-brief.md
└── README.md
```

## Weekly Workflow

1. **Clone/Update** your repository
2. **Work** on the week's changes
3. **Test** locally with Live Server
4. **Commit** with descriptive message
5. **Push** to GitHub
6. **Verify** the site on GitHub Pages

## Basic Git Commands

```bash
# Clone repository
git clone https://github.com/your-username/your-project.git

# Check status
git status

# Add changes
git add .

# Make commit
git commit -m "Description of changes"

# Push changes
git push origin main
```

## Next Steps

In the next class, we'll start with semantic HTML and the basic structure of your personal project.
