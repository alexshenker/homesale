export type HookResult<D> =
  | {
      data: D;
      isLoading: false;
      hasError: false;
    }
  | {
      data: undefined;
      isLoading: true;
      hasError: false;
    }
  | {
      data: undefined;
      isLoading: false;
      hasError: true;
      error: unknown;
    };
