import PropTypes from "prop-types";
import style from "./ThemeToggle.module.css";

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <div className={style.wrapper} title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <span className={style.icon}>☀️</span>
      <label className={style.switch} aria-label="Toggle dark mode">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={onToggle}
        />
        <span className={style.slider} />
      </label>
      <span className={style.icon}>🌙</span>
    </div>
  );
}

ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ThemeToggle;
