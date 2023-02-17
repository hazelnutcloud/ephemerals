export interface Source {
  build: () => Promise<void>;
}
