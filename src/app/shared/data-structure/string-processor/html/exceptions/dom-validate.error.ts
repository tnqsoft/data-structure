export class DomValidateError extends Error {
  private _context: any;

  /**
   * Constructor
   * @param  {string} message - Message of error
   * @param  {any} context? - Context hold Tag error
   */
  constructor(
    message: string,
    context?: any
  ) {
    super(message);
    this.name = 'DomValidateError';
    if (context) {
      this.context = context;
    }
  }

  // SETTER, GETTER

  get context(): any {
    return this._context;
  }
  set context(context: any) {
    this._context = context;
  }
}
