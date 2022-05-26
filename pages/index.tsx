import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { CardStatusEnum, CardAgeEnum } from '../common';
import { Card, Layout } from '../components';

type Card = {
  id: number,
  title: string,
  status: CardStatusEnum,
  date: string,
  age: CardAgeEnum
}

type CardsPageProps = {
  cards: Card[];
}

const INIT_CARDS: Card[] = [
  {
    id: 0,
    title: 'Заявка 1',
    status: 0,
    date: '1 день назад',
    age: 0,
  },
  {
    id: 1,
    title: 'Заявка 2',
    status: 0,
    date: '4 дня назад',
    age: 1,
  },
  {
    id: 2,
    title: 'Заявка 3',
    status: 1,
    date: '2 дня назад',
    age: 0,
  },
  {
    id: 3,
    title: 'Заявка 4',
    status: 1,
    date: '6 дней назад',
    age: 1,
  },
];

const useStyles = createUseStyles({
  CardContainer: {
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
  },
  Text: {
    color: 'red',
    fontSize: '16',
  },
});

const Home: NextPage<CardsPageProps> = ({ cards }) => {
  const styles = useStyles();
  return (
    <div className={styles.CardContainer}>
      {
        cards.map((card) => (
          <Card key={card.id} title={card.title} status={card.status} date={card.date} age={card.age}/>
        ))
      }
    </div>
  );
};

export function getServerSideProps({ query }: NextPageContext) {
  console.log(query);
  const sort = query?.sort as string;

  if (!sort) {
    return { props: { cards: INIT_CARDS } };
  }

  if (sort) {
    let queryArray = sort.split(',');

    let isOpen = queryArray.some(str => str === 'open');
    let isNew = queryArray.some(str => str === 'new');

    let sortedCards = INIT_CARDS.reduce((acc: Card[], value) => {
      if (isOpen && value.status === 0 && isNew && value.age === 0) {
        return [...acc, value];
      }

      if (isOpen && !isNew && value.status === 0) {
        return [...acc, value];
      }

      if (isNew && !isOpen && value.age === 0) {
        return [...acc, value];
      }

      return acc;
    }, []);

    return { props: { cards: sortedCards } };
  }
}

export default Home;
