---
layout: lesson
title: 'Development Environment'
title_en: 'Development Environment'
slug: development-environment
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/development-environment/
---

> **Session Objective (2h)**
>
> 1. Have VS Code + Git working.
> 2. Create **a personal repository** on GitHub.
> 3. Publish a **Hello, Web** on GitHub Pages.
>    **ATELIER Note:** at the end, each student will make **one mandatory commit** with a clear message and a brief `README.md`. This commit will serve as evidence of learning from the session.

---

# **Guide to Setting Up a Web Development Environment for Students**

## **Table of Contents**

1. [Why set up a development environment](#why-set-up-a-development-environment)
2. [Development environments: Local vs Live](#development-environments-local-vs-live)
3. [Steps to set up the development environment](#steps-to-set-up-the-development-environment)
   - [Install Visual Studio Code](#1-install-visual-studio-code)
   - [Install Git](#2-install-git)
   - [Start from Student Project Template (beginner first, advanced below)](#3-start-from-student-project-template-beginner-first-advanced-below)
   - [Explore the cloned directory structure](#4-explore-the-cloned-directory-structure)
   - [Local development with Live Server](#5-local-development-with-live-server)
   - [Live development with GitHub Pages](#6-live-development-with-github-pages)
   - [Host and optimize images with ImageKit.io](#7-host-and-optimize-images-with-imagekitio)
4. [Daily workflow](#daily-workflow)
5. [Glossary of concepts](#glossary-of-concepts)
   - [System terms](#system-terms)
   - [Network terms](#network-terms)
   - [Git and repository terms](#git-and-repository-terms)
6. [Appendix: Installing Homebrew on macOS](#appendix-installing-homebrew-on-macos)
7. [Final references](#final-references)

---

## **Why set up a development environment**

Setting up a development environment allows students to:

1. **Develop locally**: Write and test web projects on your computer using tools like **VS Code Live Server**.
2. **Collaborate**: Share your work with classmates and instructors using Git and GitHub.
3. **Publish Live**: Upload your projects online to receive feedback or showcase your work through GitHub Pages.

Learning this workflow helps adopt professional practices and lays the groundwork for more advanced projects in the future.

---

## **Development environments: Local vs Live**

### **1. Local development**

- **What it is**: Local development happens on your computer, where you write and test code using tools like **VS Code** and preview the project in your browser with **Live Server**.
- **Purpose**: Lets you experiment and make quick changes without affecting the public version of your project.

### **2. Live development**

- **What it is**: Live development involves uploading your code to a **remote repository** (for example, GitHub). GitHub Pages makes your site accessible online.
- **Purpose**: Share and showcase your project, collaborate with others, and build a professional portfolio.

---

## **Steps to set up the development environment**

### **1. Install Visual Studio Code**

- **Purpose**: VS Code is a powerful code editor with built-in Git integration.
- Download it here:
  **https://code.visualstudio.com/**

#### **Install extensions**

- **Live Server**: To preview your HTML/CSS/JS projects in real time.
  Install it here:
  **https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer**
- **GitLens**: Enhances the Git experience by showing commit history and change annotations.
  Install it here:
  **https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens**

---

### **2. Install Git**

---

#### **Installation on Windows**

1. **Download the Git installer:**
   [https://git-scm.com/download/win](https://git-scm.com/download/win)

2. **Run the installer:**

   - Click the downloaded file and follow the setup wizard instructions.
   - During installation, it's recommended to select **Git Bash** as the default terminal.

3. **Verify the installation:**

   - Open **Git Bash** from the start menu.
   - Type the following command to confirm the installation:
     ```bash
     git --version
     ```

4. **Configure your name and email for Git:**
   After installing Git, it's important to configure your identity to properly record your contributions.

   - **Set your name:**
     Run this command, replacing `Your Name` with your real name:

     ```bash
     git config --global user.name "Your Name"
     ```

   - **Set your email:**
     Run this command, replacing `your.email@example.com` with your email address:

     ```bash
     git config --global user.email "your.email@example.com"
     ```

   - **Verify the configuration:**
     Run the following command to check that the data was saved correctly:
     ```bash
     git config --global --list
     ```
     The result should show something like:
     ```
     user.name=Your Name
     user.email=your.email@example.com
     ```

5. **Important note:**
   - During installation and when using Git in the terminal, your password will not be visible as you type it. This is normal behavior to improve security.

---

#### **Installation on macOS**

1. **Install Homebrew (if you don't have it):**

   - Open **Terminal** and run the following command to install Homebrew:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Homebrew is a package manager that makes it easier to install software on macOS.
   - Installing Homebrew automatically downloads the **Xcode Command Line Tools**, which may take several minutes.

2. **Install Git using Homebrew:**

   - Once Homebrew is installed, run:
     ```bash
     brew install git
     ```

3. **Verify the installation:**

   - Type the following command to check that Git has been installed correctly:
     ```bash
     git --version
     ```

4. **Configure your name and email for Git:**

   - **Set your name:**

     ```bash
     git config --global user.name "Your Name"
     ```

   - **Set your email:**

     ```bash
     git config --global user.email "your.email@example.com"
     ```

   - **Verify the configuration:**
     ```bash
     git config --global --list
     ```

---

### **3. Start from Student Project Template (beginner first, advanced below)**

Use the official student starter located here: `student-project-template` in the course monorepo. Reference:

- Student template (GitHub): https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template

#### Beginner — Download ZIP in your browser (Windows/macOS)

1. Go to the repository home and click the green "Code" button, then "Download ZIP".
2. Unzip it. Open the unzipped folder and locate `student-project-template/`.
3. Copy the contents of `student-project-template/` into a new folder named after your project (e.g., `my-web-project`).
4. Create a new empty repository on GitHub (same name as your folder).
5. Initialize and push:

```bash
cd my-web-project
git init
git add .
git commit -m "chore: scaffold from student-project-template"
git branch -M main
git remote add origin https://github.com/<your-username>/my-web-project.git
git push -u origin main
```

#### Beginner — GitHub Desktop (Windows/macOS GUI)

1. Install GitHub Desktop and sign in.
2. File → Clone repository → URL: `https://github.com/ruvebal/web-atelier-udit` → choose a local path.
3. In Finder/Explorer, open the cloned repo and copy the folder `student-project-template/` to a new location named `my-web-project`.
4. In GitHub Desktop: File → Add local repository → select `my-web-project`.
5. Click "Publish repository" to create it on your GitHub account and push.

---

#### Advanced — VS Code (Clone) and CLI options

- VS Code GUI clone (intermediate): Source Control → "Clone Repository" → paste `https://github.com/ruvebal/web-atelier-udit` → then copy `student-project-template/` out to its own repo folder.
- CLI (Node):

```bash
# Using tiged to fetch only the subdirectory
npx tiged ruvebal/web-atelier-udit/student-project-template my-web-project
```

- CLI (no Node):

```bash
svn export https://github.com/ruvebal/web-atelier-udit/trunk/student-project-template my-web-project
```

Then `git init`, commit, and push to your new repository.

---

### **4. Explore the cloned directory structure**

After scaffolding from the template, you should see this structure:

```plaintext
student-project-template/
├── index.html                 # Semantic starter page
├── assets/
│   ├── css/
│   │   └── style.css          # Responsive, accessible styles
│   └── js/
│       └── main.js            # Basic interactions
├── images/                    # Put local images here (or use ImageKit)
├── css/style.css              # Legacy import shim to assets/css/style.css
├── project.yaml               # Project metadata (fill by Week 4)
├── project-brief.md           # Project concept (Week 2)
└── .github/workflows/critical.yml  # Optional CI checks
```

Next actions:

- Open `index.html` and set the project title and description.
- Open `project.yaml` and fill your handle, URLs, and titles (ES/EN).
- Open `project-brief.md` and complete the brief for Week 2.
- Start `npm install` then `npm run dev` if you want a live server (optional, advanced).

---

### **5. Local development with Live Server**

1. Open your project in VS Code.
2. Right-click the `index.html` file and select **Open with Live Server**.
3. Open the browser and navigate to `http://127.0.0.1:5500`.

#### **Use Chrome DevTools**

1. Press **F12** or **Cmd + Option + I** (Mac) / **Ctrl + Shift + I** (Windows) to open DevTools.
2. Go to the **Network** tab.
3. Check **Disable Cache** to ensure the browser always loads the most recent version of your project.
4. Watch changes in real time as you update your code.
5. Open your project in VS Code.
6. Right-click the `index.html` file and select **Open with Live Server**.
7. Open the browser and navigate to `http://127.0.0.1:5500`.

---

### **6. Live development with GitHub Pages**

1. Make a **commit** of the changes:

   - In the **Source Control** tab, select the files and click the `+` button.
   - Write a commit message (for example, "Initial commit") and click the checkmark.

2. **Push** the changes to the remote repository:

   - Click **Sync Changes**.

   **Equivalent commands:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

3. Enable GitHub Pages:
   - On GitHub, go to **Settings** > **Pages**.
   - Select the branch and save the changes.
   - Your site will be live at: `https://your-username.github.io/your-repository/`.

### **7. Host and optimize images with ImageKit.io**

Large images should not live in your Git repository. Use a CDN to optimize delivery.

1. Sign up and create a media library at ImageKit.io.
2. Note your URL Endpoint (example): `https://ik.imagekit.io/your_id`
3. Upload images to folders (example path: `portfolio/hero.jpg`).
4. Use automatic transformations in your HTML to serve optimized sizes:

```html
<!-- 800px wide, quality 80 -->
<img
	src="https://ik.imagekit.io/your_id/portfolio/hero.jpg?tr=w-800,q-80"
	alt="Hero image describing the project"
	width="800"
	height="auto" />
```

Responsive example with `srcset`:

```html
<img
	src="https://ik.imagekit.io/your_id/portfolio/hero.jpg?tr=w-800,q-80"
	srcset="
		https://ik.imagekit.io/your_id/portfolio/hero.jpg?tr=w-400,q-80   400w,
		https://ik.imagekit.io/your_id/portfolio/hero.jpg?tr=w-800,q-80   800w,
		https://ik.imagekit.io/your_id/portfolio/hero.jpg?tr=w-1200,q-80 1200w
	"
	sizes="(max-width: 600px) 100vw, 800px"
	alt="Responsive hero image" />
```

Background image in CSS:

```css
.hero {
	background-image: url('https://ik.imagekit.io/your_id/portfolio/texture.png?tr=w-1600,q-70');
	background-size: cover;
	background-position: center;
}
```

Accessibility notes:

- Always provide meaningful `alt` text (or `alt=""` only for decorative images).
- Prefer modern formats (AVIF/WEBP) when available: `?tr=f-webp`.
- Keep local `/images` only for tiny assets; use CDN for photos/artwork.

---

## **Daily workflow**

### **Steps for daily development**

1. **Update your local repository:**

   - Open VS Code and go to the **Source Control** tab.
   - Click **Pull** to bring the latest changes from the remote repository.

   **Equivalent command:**

   ```bash
   git pull
   ```

2. **Make changes to your code:**

   - Edit the necessary files in the project.
   - Save the changes.

3. **Preview changes locally:**

   - Use **Live Server** to see changes in real time.

4. **Commit your changes:**

   - Go to **Source Control**, select the modified files, and click the `+` button.
   - Write a commit message describing the changes and click the checkmark.

   **Equivalent commands:**

   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Upload the changes to the remote repository:**

   - Click **Sync Changes**.

   **Equivalent command:**

   ```bash
   git push
   ```

6. **Check your site on GitHub Pages** (if enabled).
   - Make sure the changes are reflected correctly.

---

## **Glossary of concepts**

### **System terms**

1. **Terminal**: Command-line interface to interact with your computer.
   - **macOS**: Open Terminal by pressing **Cmd + Space**, typing "Terminal," and pressing **Enter**.
   - **Windows**: Use Git Bash (installed with Git).
2. **Commands**: Instructions you type in the terminal to perform tasks (for example, `ls`, `mkdir`).
3. **Path**: Location of a file or folder on your computer (for example, `/Users/your-name/project`).
4. **Directory**: A folder that contains files or other folders.

### **Network terms**

1. **HTTP**: Protocol for transferring web pages and files.
2. **HTTPS**: Secure version of HTTP with encryption.
3. **Localhost**: Refers to your computer on a network (for example, `127.0.0.1`).
4. **IP address**: Unique address for devices on a network.
5. **DNS**: Translates domain names (for example, `github.com`) into IP addresses.

### **Git and repository terms**

1. **Repository**: Place to store your code and its history.
   - Local: On your computer.
   - Remote: On GitHub.
2. **Commit**: A snapshot of your project’s current state.
3. **Push**: Upload changes to the remote repository.
4. **Branch**: A version of the project for experimenting or developing features.

---

## **Appendix: Installing Homebrew on macOS**

### **What is Homebrew**

Homebrew is a package manager for macOS that simplifies installing software like Git.

### **Steps to install Homebrew**

1. Open Terminal: **Cmd + Space**, type "Terminal," and press **Enter**.
2. Run the command:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Follow the instructions. The **Xcode Command Line Tools** will be installed (requires time and disk space).
4. Add Homebrew to the path:
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```
5. Verify the installation:
   ```bash
   brew --version
   ```

---

## **Final references**

- **Visual Studio Code**:
  https://code.visualstudio.com/
- **Live Server Extension**:
  https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- **GitLens Extension**:
  https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
- **Git**:
  https://git-scm.com/
- **GitHub**:
  https://github.com/
- **GitHub Pages Documentation**:
  https://docs.github.com/en/pages
- **Homebrew (for macOS)**:
  https://brew.sh/

# Adaptaciones ATELIER

## ATELIER Note: Methodological link

This is the **first sprint** of the course. The _one commit per class_ dynamic ensures that each student records their progress incrementally. The goal is not just to install tools but to **learn to document with commits** from the start.

## Suggestion: Add grading rubric

At the end of the session, each student must make a commit with a standard message:

```bash
git commit -m "chore: environment set up · repo + index.html + pages live"
```

**Quick rubric (0–2 points):**

- **0** — no commit / publication fails.
- **1** — commit present but poor documentation.
- **2** — proper commit + complete README + Pages URL.

## ATELIER Note: Git pro tip of the day

Before each commit, run:

```bash
git status
git diff
```

This forces you to **read the changes** and avoids common errors.

## ATELIER Note: Accessibility and ethics

- Always add `lang="es"` in `<html>` for accessibility.
- Commits must be **your own and documented**. AI can help with boilerplate, but it must be acknowledged in the README (academic transparency).
- **Incremental work** is encouraged instead of accumulating tasks at the end (well-being).

## Suggestion: Connection with the philosophy

Remember that this course is framed by the motto **Critical Coding for a Better Living**: learn code not only as technique but as a critical and creative practice that improves life.

---

# Close of Lesson 01

- You have set up your **development environment**.
- You have created your **first personal repo**.
- You have deployed a **Hello, Web** on GitHub Pages.
- You have made your **first gradable commit**.

**ATELIER Note:** This commit becomes the foundation of your portfolio; every week you will add another piece until you culminate in a complete project.
