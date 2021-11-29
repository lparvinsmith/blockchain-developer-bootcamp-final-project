import "../styles/TextInput.css";

export const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="TextInput"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
