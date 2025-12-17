import React, { useEffect, useMemo, useState } from 'react';
import { GithubRepo } from '../../types/github';
import styles from './RepoList.module.css';
import { RepoCard } from './RepoCard/RepoCard';

interface Props {
  repos: GithubRepo[];
  onSelect: (repo: GithubRepo) => void;
  loading?: boolean;
  pageSize?: number;
}
// Repository list displayed as cards with pagination
export function RepoList({
  repos,
  onSelect,
  loading = false,
  pageSize = 3,
}: Props) {
  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Loading prop indicates whether data is being fetched
  const isLoading = !!loading;

  // Reset to first page whenever repo list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [repos]);

  // Compute total number of pages (at least 1)
  const totalPages = Math.max(1, Math.ceil(repos.length / pageSize));

  // Slice the repos to only those visible on the current page
  const visibleRepos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return repos.slice(start, start + pageSize);
  }, [repos, currentPage, pageSize]);

  return (
    <div className={styles.container}>
      {/* Loading skeleton when fetching data */}
      {isLoading ? (
        <div className={styles.skeleton}>
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      ) : // Empty state when there are no repositories
      repos.length === 0 ? (
        <div className={styles.empty}>No records found</div>
      ) : (
        <>
          {/* List of visible repo cards */}
          <ul className={styles.list}>
            {visibleRepos.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onClick={() => onSelect(repo)}
              />
            ))}
          </ul>

          {/* Pagination controls: prev, page buttons, next */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ‹ Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={p === currentPage ? styles.active : ''}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
