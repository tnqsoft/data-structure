export class StackHistoryUtility {
  private expressionHistory: Array<string> = [];
  private stackHistory: Array<string> = [];
  private outputHistory: Array<string> = [];
  private commentHistory: Array<string> = [];

  constructor(expression: string) {
    this.addExpressionHistory(expression);
    this.addStackHistory('');
    this.addOutputHistory('');
    this.addCommentHistory('Initial');
  }

  public addExpressionHistory(log: string): void {
    this.expressionHistory.push(log !== '' ? log : 'Empty');
  }

  public addStackHistory(log: string): void {
    log = log.replace('#', '');
    this.stackHistory.push(log !== '' ? log : 'Empty');
  }

  public addOutputHistory(log: string): void {
    this.outputHistory.push(log !== '' ? log : 'Empty');
  }

  public addCommentHistory(log: string): void {
    this.commentHistory.push(log !== '' ? log : 'Empty');
  }

  public getExpressionHistory(): Array<string> {
    return this.expressionHistory;
  }

  public getStackHistory(): Array<string> {
    return this.stackHistory;
  }

  public getOutputHistory(): Array<string> {
    return this.outputHistory;
  }

  public getCommentHistory(): Array<string> {
    return this.commentHistory;
  }
}
