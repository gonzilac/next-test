import { FC, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void;
}

const useStyles = createUseStyles({
  Button: {
    color: '#000',
    backgroundColor: '#C4C4C4',
    fontSize: 12,
    fontWeight: '400',
    border: 'none',
    borderRadius: 10,
    padding: '13px 20px',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.3s',
    fontFamily: 'Inter',
    '&:hover': {
      opacity: 0.8,
    },
    '&:active': {
      opacity: 0.5,
    },
  },
});

export const Button: FC<ButtonProps> = (props) => {
  const styles = useStyles();
  return (
    <button onClick={props.onClick} className={styles.Button}>{props.children}</button>
  );
};
