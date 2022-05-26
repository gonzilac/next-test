import Router, { useRouter } from 'next/router';
import { FC, useState, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from './button';
import { Checkbox } from './checkbox';

const useStyles = createUseStyles({
  Menu: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export const Menu: FC = () => {
  const styles = useStyles();

  const router = useRouter();

  const [openCheckbox, setOpenCheckbox] = useState<boolean>(false);
  const [newCheckbox, setNewCheckbox] = useState<boolean>(false);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [oldSortQuery, setOldSortQuery] = useState<string | undefined>(undefined);

  const handleOpenCheckbox = useCallback((checked: boolean) => {
    setOpenCheckbox(checked);
  }, []);

  const handleNewCheckbox = useCallback((checked: boolean) => {
    setNewCheckbox(checked);
  }, []);

  useEffect(() => {
    const sort = router.query?.sort as string;
    setOldSortQuery(sort);
    if (sort) {
      let sortArray = sort.split(',');
      setCheckboxes(sortArray);
      setOpenCheckbox(sortArray.some(str => (str === 'open')));
      setNewCheckbox(sortArray.some(str => (str === 'new')));
    }
  }, [router]);

  const handleSuccess = () => {
    const successCheckboxes: string[] = [];
    if (openCheckbox && !successCheckboxes.some(str => str === 'open')) {
      successCheckboxes.push('open');
    }

    if (newCheckbox && !successCheckboxes.some(str => str === 'new')) {
      successCheckboxes.push('new');
    }

    setCheckboxes(successCheckboxes);
  };

  useEffect(() => {
    const query = {
      sort: checkboxes.length > 0 ? checkboxes.join(',') : undefined,
    };

    if (query.sort !== oldSortQuery) {
      Router.push({
        pathname: '/',
        query: query.sort ? query : undefined,
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [checkboxes, oldSortQuery]);

  return (
    <div className={styles.Menu}>
      <Checkbox checked={openCheckbox} onChecked={handleOpenCheckbox} title={'Открытые'}/>
      <Checkbox checked={newCheckbox} onChecked={handleNewCheckbox} title={'Новые'}/>
      <Button onClick={handleSuccess}>Найти</Button>
    </div>
  );
};
