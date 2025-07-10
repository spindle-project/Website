<div align="center"> <img src="https://cdn.glitch.global/e1bb975a-9da8-4eb1-bcd1-68066f8e9cd4/thumbnails%2Flogo-no-background.png?1734132398879" style="height: 200px; padding: 20px" />
<h1><b>The Spindle Website</b></h1> <p style="font-size:14px">  <b> Programming language that enables you to practice AP CSP Exam code as real, live code.  </b> 
</b></b> <br> ⭐ Star us, it motivates us a lot! <br>  ✨  <a href="https://github.com/spindle-project/Spindle">Also star the Spindle language itself!</a></div> <br>

# **Welcome to the Spindle Website Repository!**

> *The Spindle Website serves as the primary platform for Spindle, a programming language specifically designed to aid students in learning and mastering AP Computer Science Principles (AP CSP). It allows users to write and execute code based on the AP CSP exam pseudocode, bridging the gap between theoretical concepts and practical application. This repository contains the complete source code for the website, encompassing an interactive Integrated Development Environment (IDE) with both text and block-based options, comprehensive documentation, and targeted exam preparation resources. Our goal is to simplify AP CSP, offer interactive learning experiences, and foster an open-source community.*

## 🏆 Project Goals:
1. Simplify AP CSP: Provide a user-friendly interface and clear explanations of complex concepts.
2. Interactive Learning: Offer interactive exercises and quizzes to reinforce understanding.
3. Community Building: Foster a supportive community of learners and educators.
4. Open-Source Collaboration: Encourage contributions from the open-source community to enhance the platform.

## ⭐ Features

*   **Interactive Dual IDEs:**
    *   **Text-based IDE:** Write Spindle code using syntax closely mirroring the AP CSP exam reference sheet. This IDE is powered by PyScript, running the Spindle interpreter (written in Python) directly in the browser.
    *   **Block-based IDE:** A visual coding environment using Blockly, allowing users to construct programs by dragging and dropping blocks that represent AP CSP pseudocode concepts. JavaScript generators convert these blocks into executable code.
*   **Comprehensive Documentation:**
    *   **User Guide:** Teaches the fundamentals of programming in Spindle, covering variables, operators, control flow (IF statements, loops), procedures (functions), and built-in functions.
    *   **Contributor Guide:** Provides technical details on the inner workings of the Spindle interpreter, including the semi-parser, lexer, parser, and interpreter components, for those looking to contribute to the language itself.
*   **AP CSP Exam Preparation:**
    *   Interactive practice questions on various AP CSP topics.
    *   Study tips to help students prepare effectively for the AP CSP exam. These resources are dynamically fetched from a Google Sheet.
*   **AP CSP Aligned Syntax:** Spindle's syntax is intentionally designed to match the pseudocode found on the official AP CSP exam reference sheet, building familiarity and confidence for test-takers.
*   **Open Source:** The website and the Spindle language are open source, encouraging community contributions and accessibility for all learners and educators.

## 🏗️ Repository Structure

This repository is organized as follows:

*   `/index.html`: The main landing page for the Spindle website.
*   `/ide/`: Contains the Integrated Development Environments.
    *   `/ide/text/`: Source files for the text-based Spindle IDE. Key files include `index.html` (layout), `spindle.py` (the Python-based interpreter for Spindle), and `pyscript.toml` (PyScript configuration).
    *   `/ide/block/`: Source files for the block-based Spindle IDE. Key files include `index.html` (layout) and `script.js` (Blockly block definitions and JavaScript code generators).
*   `/docs/`: Documentation for users and contributors.
    *   `/docs/user/`: Guides for learning how to use the Spindle language.
    *   `/docs/contributor/`: Technical documentation detailing the Spindle language internals (lexer, parser, interpreter).
*   `/exam-prep/`: Tools and resources for AP CSP exam preparation. `index.html` and `script.js` manage fetching and displaying practice questions and study tips.
*   `/css/`: Contains various stylesheets, including `modern.css` for the overall look and feel, and theme-specific files like `light.css`, `dark.css`, and high-contrast versions.
*   `/styles.css`, `/styles_background.css`: Additional main CSS files for the website's styling.
*   `/Global/navigation.js`: JavaScript for generating the common navigation bar and footer used across the site.
*   `LICENSE.md`: The Mozilla Public License 2.0 governs this project.
*   `.github/`: Contains GitHub-specific files such as issue templates (`bug_report.md`, `feature_request.md`) and the `CODE_OF_CONDUCT.md`.

## 🧑‍💻 Technologies Used

*   **Frontend:** HTML, CSS, JavaScript
*   **Text-based IDE:**
    *   PyScript: To run Python code (the Spindle interpreter) in the browser.
    *   Python: The Spindle language interpreter (`ide/text/spindle.py`) is written in Python.
*   **Block-based IDE:**
    *   Blockly: A library for building visual block coding editors.
*   **Styling:** Modern CSS practices, with distinct themes available.
# 🧶 Contributing:

> *We welcome contributions to the Spindle website! Whether it's reporting bugs, suggesting new features, or submitting code improvements, your help is appreciated.*

Report Issues: Identify and report any bugs or errors.
Suggest Features: Share ideas for new features or improvements.
Contribute Code: Submit pull requests with code changes.
Thanks to these wonderful people for helping to make Spindle's website what it is now! <br>
[rico33631](https://github.com/rico33631): Developed the website's accessibility features <br>
[RAHUL KUMAR](https://github.com/RahulKumar9988): Developed the website's accessibility features  <br>
[Ansh2904](https://github.com/Ansh2904): Improved the website's headings

# 🧑‍⚖️ License:

This project is fully licensed under the Mozilla Public License Version 2.0. Please take a look at the [LICENSE.md](LICENSE.md) file for the full license text.
