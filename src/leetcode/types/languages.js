const Languages = Object.freeze({
    JAVASCRIPT: "javascript",
    PYTHON: "python",
    RUBY: "ruby",
    JAVA: "java",
    CSHARP: "csharp",
    CPLUSPLUS: "cplusplus",
    RUST: "rust",
});

const BaseImages = Object.freeze({
    javascript: "node:alpine",
    python: "python:alpine",
    ruby: "ruby:alpine",
    java: "openjdk:alpine",
    rust: "rust:latest",
    cplusplus: "gcc:latest",
});

const Commend = Object.freeze({
    javascript: ["node", "/scripts/index.js"],
    python: ["python", "/scripts/index.py"],
    ruby: ["ruby", "/scripts/index.rb"],
    java: ["java", "-jar", "/scripts/index.jar"],
    rust: ["cargo", "run", "--bin", "main"],
    cplusplus: [
        "/bin/sh",
        "-c",
        "g++ /scripts/main.cpp -o /scripts/main && /scripts/main",
    ],
});

const LanguageFileExtensions = Object.freeze({
    javascript: "js",
    rust: "rs",
    cplusplus: "cpp",
});

export { Languages, BaseImages, Commend, LanguageFileExtensions };
