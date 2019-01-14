import * as _ from 'lodash';
import { Util } from '../utility/util.utility';

/**
 * Implement Poish Nonation Utilitiy
 * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 *
 * @author Nguyen Nhu Tuan <tuanquynh0508@gmail.com>
 */
export class PolishNotationAlgorithm {

  public PATTERN_VALID_INFIX        = '^(?:[0-9a-zA-Z]|\\s|\\+|\\-|\\*|\\/|\\^|\\(|\\))+$';
  public PATTERN_VALID_OPERATOR     = '^(?:\\+|\\-|\\*|\\/|\\^)$';
  public PATTERN_VALID_OPERAND      = '^(?:[0-9a-zA-Z]+)$';
  public PATTERN_PRE_FORMAT_LEVEL1  = '(?:\\r\\n|\\r|\\n|\\s)';
  public PATTERN_PRE_FORMAT_LEVEL2  = '(\\+|\\-|\\*|\\/|\\^|\\)|\\()';

  private infixToken: Array<string> = [];

  constructor(expression: string) {
    this.infixToken = this.string2Token(expression);
    if (!this.isValidInfixToken(this.infixToken)) {
      throw new Error('Express invalid');
    }
  }

  public getPostfix(asString?: boolean): any {
    if (!asString) {
      asString = false;
    }
    const postfixToken = this.infix2Postfix(_.clone(this.infixToken));
    if (asString) {
      return postfixToken.join(' ');
    }
    return postfixToken;
  }

  /**
   * Get Prefix
   * @param  {boolean} asString?
   * @returns any
   */
  public getPrefix(asString?: boolean): any {
    if (!asString) {
      asString = false;
    }
    const prefixToken = this.infix2Prefix(_.clone(this.infixToken));
    if (asString) {
      return prefixToken.join(' ');
    }
    return prefixToken;
  }

  public infix2Prefix(token: Array<string>): Array<string> {
    const output: Array<string> = [];
    const tmpStack: Array<string> = [];
    // Add Special Character To End
    tmpStack.push('#');
    token.reverse();
    for (let i = 0; i < token.length; i++) {
      const item: string = token[i];
      if (this.isOperand(item)) {
        output.push(item);
      } else if (item === ')') {
        tmpStack.push(item);
      } else if (item === '(') {
        while (Util.getLast(tmpStack) !== ')') {
          output.push(tmpStack.pop());
        }
        tmpStack.pop();
      } else {
        if (this.getPriority(item) >= this.getPriority(Util.getLast(tmpStack))) {
          tmpStack.push(item);
        } else {
          while (this.getPriority(item) <= this.getPriority(Util.getLast(tmpStack))) {
            output.push(tmpStack.pop());
          }
          tmpStack.push(item);
        }
      }
    }
    while (Util.getLast(tmpStack) !== '#') {
      output.push(tmpStack.pop());
    }
    output.reverse();
    return output;
  }

  public infix2Postfix(token: Array<string>): Array<string> {
    const output: Array<string> = [];
    const tmpStack: Array<string> = [];
    // Add Special Character To End
    tmpStack.push('#');
    for (let i = 0; i < token.length; i++) {
      const item: string = token[i];
      if (this.isOperand(item)) {
        output.push(item);
      } else if (item === '(') {
        tmpStack.push(item);
      } else if (item === ')') {
        while (Util.getLast(tmpStack) !== '(') {
          output.push(tmpStack.pop());
        }
        tmpStack.pop();
      } else {
        while (this.getPriority(item) <= this.getPriority(Util.getLast(tmpStack))) {
          output.push(tmpStack.pop());
        }
        tmpStack.push(item);
      }
    }
    while (Util.getLast(tmpStack) !== '#') {
      output.push(tmpStack.pop());
    }
    return output;
  }

  protected getPriority(operator: string): number {
    switch (operator) {
      case '+': case '-':
        return 1;
      case '*': case '/':
        return 2;
      case '^':
        return 3;
      default:
        return 0;
    }
  }

  protected isValidBrackets(token: Array<string>): boolean {
    let bracketSum = 0;
    for (let i = 0; i < token.length; i++) {
      // If i is open bracket and after is not operator
      if (token[i] === '(' && (i === token.length - 1 || !this.isOperator(token[i + 1]))) {
        ++bracketSum;
        // If i is close bracket and before is not operator
      } else if (token[i] === ')' && (i === 0 || !this.isOperator(token[i - 1]))) {
        --bracketSum;
        // If i is operator and has before or after is operator too
      } else if (token[i] === '^' && (!this.isOperator(token[i - 1]) || !this.isOperand(token[i + 1]))) {
        return false;
      } else if (this.isOperator(token[i]) && (this.isOperator(token[i - 1]) || this.isOperator(token[i + 1]))) {
        return false;
      }
    }
    return bracketSum === 0;
  }

  protected exeExpress(operator: string, operand1: any, operand2?: any): any {
    if (!this.isOperator(operator)) {
      throw new Error('Not allow "' + operator + '" operator');
    }
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      case '^':
        // tslint:disable-next-line:no-bitwise
        return operand1 ^ operand2;
      default:
        return null;
    }
  }

  private isValidInfixToken(token: Array<string>): boolean {
    if (!token || token.length === 0) {
      return true;
    }
    // Check First or Last Element is operator
    if (this.isOperator(token[0]) || this.isOperator(token[token.length - 1])) {
      return false;
    }
    // Check token has correct brackets
    return this.isValidBrackets(token);
  }

  private isOperator(value: string): boolean {
    const regex: RegExp = new RegExp(this.PATTERN_VALID_OPERATOR);
    return regex.test(value);
  }

  private isOperand(value: string): boolean {
    const regex: RegExp = new RegExp(this.PATTERN_VALID_OPERAND);
    return regex.test(value);
  }

  private preFormat(str: string): string {
    const regex1: RegExp = new RegExp(this.PATTERN_PRE_FORMAT_LEVEL1, 'g');
    const regex2: RegExp = new RegExp(this.PATTERN_PRE_FORMAT_LEVEL2, 'g');
    str = str.replace(regex1, '');
    // Level 2 add space after and before of +, -, *, /, ^, ) and (
    return str.replace(regex2, ' $1 ');
  }

  private string2Token(str: string): Array<string> {
    str = this.preFormat(str);
    const regex: RegExp = new RegExp(this.PATTERN_VALID_INFIX);
    if (!regex.test(str)) {
      throw new Error('Express invalid');
    }
    return str.trim().split(/\s+/g);
  }
}
