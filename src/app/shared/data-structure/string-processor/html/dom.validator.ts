import * as _ from 'lodash';
import { DomItemModel } from './models/dom-item.model';
import { DomValidateError } from './exceptions/dom-validate.error';

/**
 * Validate and fix HTML DOM Utilitiy
 *
 * @author Nguyen Nhu Tuan <tnguyennhu@pentalog.com>
 */
export class DomValidator {
  private contentHtml: string;
  private contentMask: string;
  private errors: Array<DomValidateError> = [];
  private invalidElement: Array<DomItemModel> = [];

  /**
   * Constructor
   * @param  {string} content
   */
  constructor(content: string) {
    this.contentHtml = content;
    this.contentMask = content;
  }

  /**
   * Get Errors
   * @returns Array
   */
  public getError(): Array<DomValidateError> {
    return this.errors;
  }

  /**
   * Fix Content
   * @param  {boolean} withEscape?
   * @returns string
   */
  public fixContent(withEscape?: boolean): string {
    if (!withEscape) {
      withEscape = false;
    }
    let content: string = this.contentMask;
    if (withEscape) {
      // Escape tag, which is not html's tag
      content = this.escapeCustomTag(content);
    }
    // Fix invalid tags
    this.invalidElement.map(item => {
      let fixContent = '';
      if (item.isClosePart()) {
        fixContent = `<${item.domName}>${item.full}`;
      } else {
        fixContent = `${item.full}</${item.domName}>`;
      }
      const finder: RegExp = new RegExp('\\|' + item.maskId + '\\*+\\|', 'g');
      content = content.replace(finder, fixContent);
    });

    return content;
  }

  /**
   * Remove Errors
   * @param  {boolean} withEscape?
   * @returns string
   */
  public removeErrors(withEscape?: boolean): string {
    if (!withEscape) {
      withEscape = false;
    }
    let content: string = this.contentMask;
    if (withEscape) {
      // Escape tag, which is not html's tag
      content = this.escapeCustomTag(content);
    }
    // Fix invalid tags
    this.invalidElement.map(item => {
      const finder: RegExp = new RegExp('\\|' + item.maskId + '\\*+\\|', 'g');
      content = content.replace(finder, '');
    });

    return content;
  }

  /**
   * Escape Content
   * @returns string
   */
  public escapeContent(): string {
    let content: string = this.contentMask;
    // Escape tag, which is not html's tag
    content = this.escapeCustomTag(content);
    // Escape invalid tags
    this.invalidElement.map(item => {
      const finder: RegExp = new RegExp('\\|' + item.maskId + '\\*+\\|', 'g');
      content = content.replace(finder, _.escape(item.full));
    });

    return content;
  }

  /**
   * Parser
   * @returns void
   */
  public parser(): void {
    // Find all of tags in content
    const regex: RegExp = new RegExp('<(\\/?[a-zA-Z]+)\\s?([^>]*)?>', 'g');
    let list;
    const tmpStack: Array<DomItemModel> = [];
    while ((list = regex.exec(this.contentHtml)) !== null) {
      const domItem: DomItemModel = new DomItemModel(list[1], list.index, list[0]);
      if (domItem.isSingle() || !domItem.isHtmlTag()) {
        continue;
      }
      if (!domItem.isClosePart()) {
        tmpStack.push(domItem);
      } else if (tmpStack.length === 0) {
        this.addInvalidElement(domItem);
      } else if (tmpStack[tmpStack.length - 1].isPaired(domItem)) {
        tmpStack.pop();
      } else {
        this.addInvalidElement(domItem);
      }
    }

    while (tmpStack.length > 0) {
      this.addInvalidElement(tmpStack.pop());
    }

    // Check Invalid Elements, Push Error to list
    if (this.invalidElement.length > 0) {
      this.invalidElement.map(item => {
        this.addReplaceMask(item);
        this.errors.push(new DomValidateError(`Dom Element "${item.full}" at position ${item.index} invalid`, item));
      });
    }
  }

  /**
   * Add Invalid Element
   * @param  {DomItem} domItem
   * @returns void
   */
  private addInvalidElement(domItem: DomItemModel): void {
    domItem.maskId = this.invalidElement.length;
    this.invalidElement.push(domItem);
  }

  /**
   * Add Replace Mask
   * @param  {DomItem} domItem
   * @returns void
   */
  private addReplaceMask(domItem: DomItemModel): void {
    const fillMax: number = domItem.full.length - `|${domItem.maskId}|`.length;
    const fillText = `|${domItem.maskId}${new Array(fillMax + 1).join('*')}|`;
    this.contentMask = this.contentMask.substr(0, domItem.index) +
      fillText + this.contentMask.substr(domItem.index + fillText.length);
  }

  /**
   * Escape Custom Tag
   * @param  {string} content
   * @returns string
   */
  private escapeCustomTag(content: string): string {
    const result: any = content.match(/<([^>]*)>/g);
    if (null !== result) {
      result.map(item => {
        // tslint:disable-next-line:max-line-length
        if (!/<\/?(\!|\!DOCTYPE|a|abbr|address|area|article|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|detail|dfn|dialog|div|dl|dt|em|strong|embed|fieldset|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rb|rp|rt|rtc|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|tr|track|u|ul|var|video|wbr|xml)([^>]*)\/?>/i.test(item)) {
          content = content.replace(item, _.escape(item));
        }
      });
    }
    return content;
  }
}
