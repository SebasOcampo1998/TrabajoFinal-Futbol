
import '../styles/ThemeToggle.css';

function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={darkMode}
      aria-label={
        darkMode
          ? 'Cambiar a modo claro'
          : 'Cambiar a modo oscuro'
      }
    >
      <span className="theme-toggle__icon">
        {darkMode ? '☀️' : '🌙'}
      </span>

      <span className="theme-toggle__text">
        {darkMode ? 'Modo claro' : 'Modo oscuro'}
      </span>
    </button>
  );
}

export default ThemeToggle;
