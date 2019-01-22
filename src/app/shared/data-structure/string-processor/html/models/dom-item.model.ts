export class DomItemModel {
  public domName: string;
  public index: number;
  public full: string;
  public maskId: number;

  constructor(domName: string, index: number, full: string) {
    this.domName = domName.trim();
    this.index = index;
    this.full = full;
  }

  public isSingle(): boolean {
    return /^(?:input|br|hr|link|meta|base|img|!DOCTYPE|area|col|command|embed|keygen|param|source|track|wbr)/i.test(this.domName);
  }

  public isClosePart(): boolean {
    return /^(?:\/[a-zA-Z]+)$/i.test(this.domName);
  }

  public isPaired(domItem: DomItemModel): boolean {
    return '/' + this.domName === domItem.domName;
  }

  public isHtmlTag(): boolean {
    // tslint:disable-next-line:max-line-length
    return /<\/?(\!|\!DOCTYPE|a|abbr|address|area|article|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|detail|dfn|dialog|div|dl|dt|em|strong|embed|fieldset|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rb|rp|rt|rtc|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|tr|track|u|ul|var|video|wbr|xml)([^>]*)\/?>/i.test('<' + this.domName + '>');
  }
}
