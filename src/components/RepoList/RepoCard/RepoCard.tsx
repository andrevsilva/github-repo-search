import { GithubRepo } from '../../../types/github';
import styles from './RepoCard.module.css';

interface Props {
  repo: GithubRepo;
  onClick: () => void;
}

// Props for the RepoCard component
interface _RepoCardPropsComment {}

// Card component that shows brief repository info and handles click
export function RepoCard({ repo, onClick }: Props) {
  return (
    // List item acts as a clickable card
    <li className={styles.card} onClick={onClick}>
      {/* Header: star icon, repository name, and star count */}
      <div className={styles.header}>
        <span className={styles.star}>⭐</span>
        <h3>{repo.name}</h3>
        <span className={styles.count}>
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      {/* Description: can be long, CSS clamps to two lines with ellipsis */}
      <p>{repo.description || 'Sem descrição'}</p>

      {/* Footer: show language and repository id */}
      <div className={styles.footer}>
        <span className={styles.language}>{repo.language ?? 'N/A'}</span>
        <span className={styles.id}>#{repo.id}</span>
      </div>
    </li>
  );
}
