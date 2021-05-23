import styles from './styles.module.css';

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void,
  children?: React.ReactNode,
  color?: 'primary' | 'secondary',
};

export default function Button({ onClick, children, color }: ButtonType) {
  return (
    <button 
      className={`${styles.button} ${styles[color || '']}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
