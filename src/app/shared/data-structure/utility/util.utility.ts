export class Util {

  static getLast(list: Array<any>): any {
    if (list.length === 0) {
      return null;
    }
    return list[list.length - 1];
  }

}
