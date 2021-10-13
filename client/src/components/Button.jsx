import '../styles/Button.css'

export const Button = ({ onClick, children }) => {
  return <button className="button" onClick={onClick}>{children}</button>
}