export interface MainState {
  errors: GenericError
}

export interface GenericError {
  code: number | null;
  message: string | null;
}
