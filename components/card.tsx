import { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { CardStatusEnum, CardAgeEnum } from '../common';

type CardProps = {
  title: string;
  status: CardStatusEnum;
  date: string;
  age: CardAgeEnum;
}

const useStyles = createUseStyles<any, CardProps>({
  Card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: '16px 20px 20px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    minHeight: 130,
    '&:hover': {
      opacity: 0.8,
    },
    fontFamily: 'Inter',
  },
  Card__Title: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000',
  },
  Card__Status: ({ status }) => ({
    marginTop: 10,
    fontSize: 12,
    fontWeight: '400',
    color: status === 0 ? '#00AD11' : '#C00000',
  }),
  Card__Date: {
    marginTop: 30,
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
});

export const Card: FC<CardProps> = (props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.Card}>
      <div className={styles.Card__Title}>{props.title}</div>
      <div className={styles.Card__Status}>{CardStatusEnum[props.status]}</div>
      <div className={styles.Card__Date}>{`${props.date} (${CardAgeEnum[props.age]})`}</div>
    </div>
  );
};
