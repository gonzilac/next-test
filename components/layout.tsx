import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import { Menu } from './menu';

type LayoutProps = {
  pageTitle: string;
  children?: ReactNode;
}

const useStyles = createUseStyles({
  Layout__Container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  Layout__Menu: {
    minWidth: '260px',
    backgroundColor: '#fff',
  },
  Layout__Content: {
    padding: '24px 20px',
    backgroundColor: '#C4C4C4',
    width: '100%',
    boxSizing: 'border-box',
  },
});

export const Layout: FC<LayoutProps> = (props) => {
  const styles = useStyles();
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter"
          rel="stylesheet"
        />
        <title>{props.pageTitle}</title>
      </Head>
      <div className={styles.Layout__Container}>
        <div className={styles.Layout__Menu}>
          <Menu/>
        </div>
        <div className={styles.Layout__Content}>
          {props.children}
        </div>
      </div>
    </>
  );

};
