import "../styles/Button.css";

export const Button = ({ onClick, disabled, children }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
