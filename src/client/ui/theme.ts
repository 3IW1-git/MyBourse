const THEME_KEY = "mybourse-theme";

export type Theme = "light" | "dark";

export function getSavedTheme(): Theme {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
        return saved;
    }
    return "light";
}

export function applyTheme(theme: Theme): void {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
}

export function initThemeToggle(): void {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    let current = getSavedTheme();
    applyTheme(current);
    btn.textContent = current === "dark" ? "☀️" : "🌙";

    btn.addEventListener("click", () => {
        current = current === "dark" ? "light" : "dark";
        applyTheme(current);
        btn.textContent = current === "dark" ? "☀️" : "🌙";
    });
}
