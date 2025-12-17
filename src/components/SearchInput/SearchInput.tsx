import styles from './SearchInput.module.css';

// Props: receive an onSearch callback with the input value
interface Props {
  onSearch: (value: string) => void;
}

// SearchInput: simple input + button for repository search
export function SearchInput({ onSearch }: Props) {
  return (
    <div className={styles.searchBox}>
      {/* Text input: calls onSearch on every change with the current value */}
      <input
        placeholder='Type the repository name...'
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
