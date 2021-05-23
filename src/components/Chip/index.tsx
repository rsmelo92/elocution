import styles from './styles.module.css';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
}

export default function Chip(props: Props) {
  const { children, color } = props

  return (
    <span className={`${styles.chip} ${styles[color || '']}`} >
      {children}
    </span>
  );
}
