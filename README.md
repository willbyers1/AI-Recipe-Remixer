# 🍳 AI-Recipe-Remixer
<!-- Tech Stack Badges -->
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WebGL](https://img.shields.io/badge/WebGL-OGL-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://github.com/o-m-m/ogl)

<!-- Project Status Badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/your-username/AI-Recipe-Remixer/pulls)

> **Transform your leftover ingredients into creative culinary masterpieces powered by Google Gemini AI.**

AI-Recipe-Remixer is a modern, high-performance, client-side web application designed to help users discover delicious recipes using whatever ingredients they have in their fridge or pantry. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and interactive **WebGL visual effects**, it offers a seamless and engaging cooking assistant experience.

---

## ✨ Features

- **🤖 Gemini AI Integration:** Leverages Google's Gemini API to generate 3 distinct, creative, and structured recipes in a single optimized request.
- **🏷️ Smart Ingredient Tagging:** Enter ingredients with natural tag creation, optional measurements (e.g., `"2 eggs"`, `"500g chicken"`), and quick-start suggestions.
- **🎨 Interactive WebGL UI:** Features custom WebGL components built with `ogl`:
  - **Ferrofluid Background:** Futuristic, fluid mouse-interactive hero section.
  - **SpecularButton:** Eye-catching liquid-metallic action buttons.
- **🍷 Custom Preferences:** Fine-tune outputs with cuisine types, dietary restrictions, cooking time limits, and serving counts.
- **💾 LocalStorage Persistence:** Keep your API key, saved recipes, and previous remix history completely private and stored locally in your browser.
- **📱 Responsive Glassmorphic Design:** Modern dark mode interface with smooth micro-interactions, responsive grids, and accessible controls.
- **🔒 Privacy-First Architecture:** Pure client-side application. No backend server stores your API keys or personal recipe history.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`)
- **Graphics / 3D:** [OGL](https://github.com/o-m-m/ogl) (for Ferrofluid & SpecularButton shaders)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Ferrofluid.tsx          # WebGL background component
│   ├── SpecularButton.tsx      # WebGL action button component
│   ├── IngredientInput.tsx     # Tag/chip input with suggestions
│   ├── RecipeCard.tsx          # Recipe summary & preview card
│   ├── RecipeModal.tsx         # Detailed step-by-step modal view
│   ├── SettingsModal.tsx       # API Key & preferences manager
│   ├── HistoryDrawer.tsx       # Saved recipes & history viewer
│   └── HowItWorks.tsx          # Interactive user guide section
├── hooks/
│   ├── useGemini.ts            # Custom hook for API interaction
│   └── useLocalStorage.ts      # LocalStorage state management
├── lib/
│   └── gemini.ts               # Gemini API configuration & prompt logic
├── types/
│   └── recipe.ts               # TypeScript interfaces & types
├── utils/
│   └── helpers.ts              # Formatting & helper utilities
├── App.tsx                     # Main layout & app state
├── main.tsx                    # React DOM entry point
└── index.css                   # Global styles & Tailwind directives
```

---

## 🚀 Quick Start & Setup

### Prerequisites

- **Node.js** `v18.0.0` or higher
- **npm** or **yarn** or **pnpm**
- A **Google Gemini API Key** (Free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Recipe-Remixer.git
cd AI-Recipe-Remixer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 Obtaining & Setting Up Your Gemini API Key

To use the AI-Recipe-Remixer app, you will need a Google Gemini API key:

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google Account.
3. Click on **"Get API Key"** and create a new API key.
4. Launch **AI-Recipe-Remixer** in your browser.
5. Click on the **Settings Gear Icon ⚙️** in the top navigation bar.
6. Paste your Gemini API key into the secure input field and click **Save**.

> **Note on Security:** Your API key is stored strictly inside your browser's local storage (`localStorage`). It is never transmitted to any external backend server other than directly to Google's official Gemini API endpoint.

---

## 💡 How It Works

1. **Add Ingredients:** Type ingredients into the search box and press `Enter` or comma `,` to add them as tags. Alternatively, click any of the quick-suggestion presets.
2. **Set Preferences (Optional):** Define your preferred cuisine, dietary rules (e.g., Vegan, Gluten-Free), max prep time, or serving sizes.
3. **Remix Your Pantry:** Click the **"Remix My Ingredients"** SpecularButton.
4. **Explore Recipes:** View 3 custom, creative recipes tailored to your inputs complete with prep times, ingredients checklists, step-by-step cooking guide, and nutritional insights.
5. **Save & Revisit:** Save your favorite recipes to your personal cookbook or review previous searches anytime.

---

## 🎨 WebGL Visual Components

This project integrates custom components inspired by **React Bits**:

- **`<Ferrofluid />`**: Custom WebGL shader rendering liquid magnetic movement in the hero background.
- **`<SpecularButton />`**: High-gloss specular highlight button that reacts dynamically to cursor position.

---

## 🧪 Building for Production

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).



<div align="center">

**Created By Mert Batu Bülbül**
* 🎓 Computer Engineering Undergraduate * 💻 Full Stack Developer & AI Enthusiast *



*Start tracking your rig's health today!* 🖥️✨
<br/>
**Don't forget to star ⭐ this repo if you found it useful!**

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/your-username/AI-Recipe-Remixer/issues).
