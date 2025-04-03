import styles from './SearchInput.module.scss';
export default function SearchInput() {
  return <input className={styles.input} type="text" name="search" />;
}
