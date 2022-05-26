import { FC } from 'react';
import { createUseStyles } from 'react-jss';

type CheckBoxProps = {
  title?: string;
  checked: boolean;
  onChecked: (checked: boolean) => void;
}

const useStyles = createUseStyles({
  Checkbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Checkbox__Title: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
    fontFamily: 'Inter',
  },
  Checkbox__Input: {},
});

export const Checkbox: FC<CheckBoxProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.Checkbox}>
      <input
        checked={props.checked}
        onChange={(e) => props.onChecked(e.target.checked)}
        className={styles.Checkbox__Input} type={'checkbox'}
      />
      {
        props.title && <label className={styles.Checkbox__Title}>{props.title}</label>
      }
    </div>
  );
};
