import React, { useEffect } from 'react';
import { GithubRepo } from '../../types/github';
import styles from './RepoModalCard.module.css';
import { formatDate } from '../../utils/formatDate';

interface Props {
  repo: GithubRepo | null;
  onClose: () => void;
}

// Shows the selected repository details in a modal
export function RepoCard({ repo, onClose }: Props) {
  useEffect(() => {
    // Close modal on Escape key press
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    // Attach keyboard listener only when modal is open
    if (repo) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [repo, onClose]);

  // Do not render if no repository is selected
  if (!repo) return null;

  return (
    // Overlay: clicking outside the modal closes it
    <div
      className={styles.overlay}
      role='dialog'
      aria-modal='true'
      onClick={onClose}
    >
      {/* Modal container: prevent overlay clicks from closing modal when interacting */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.title}>{repo.full_name}</div>
          <button
            className={styles.closeButton}
            aria-label='Fechar'
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {/* Owner avatar */}
          <img src={repo.owner.avatar_url} alt='author avatar' />
          {/* Star count */}
          <span>⭐ {repo.stargazers_count}</span>
          {/* Formatted creation date */}
          <p>Created: {formatDate(repo.created_at)}</p>
          {/* Formatted last update date */}
          <p>Last updated: {formatDate(repo.updated_at)}</p>
          {/* Repository description */}
          {repo.description}

          {/* Open repository in a new tab */}
          <button onClick={() => window.open(repo.clone_url, '_blank')}>
            Open repository
          </button>
        </div>
      </div>
    </div>
  );
}
