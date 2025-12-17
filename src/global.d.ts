interface ImportMetaEnv {
  readonly VITE_SOME_KEY?: string;
  readonly [key: string]: string | boolean | undefined;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// Declarations for CSS modules (e.g. import styles from './file.module.css')
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Declarations for SCSS modules
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Allow importing plain CSS/SCSS files without type errors
declare module '*.css';
declare module '*.scss';
