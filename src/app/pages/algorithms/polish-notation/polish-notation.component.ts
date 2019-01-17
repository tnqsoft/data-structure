import { Component, OnInit } from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/php/php';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/selection/active-line';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PolishNotationAlgorithm } from 'src/app/shared/data-structure/algorithms/polish-notation.algorithm';
import { StackHistoryUtility } from 'src/app/shared/data-structure/utility/stack-history.utility';
import { expressionValidator } from 'src/app/shared/directives/expression-validator.directive';

@Component({
  selector: 'app-polish-notation',
  templateUrl: './polish-notation.component.html',
  styleUrls: ['./polish-notation.component.scss']
})
export class AlgorithmPolishNotationComponent implements OnInit {

  public jsContent: string;

  public contentPhp: string;
  public exampleData = '((15 ÷ (7 − (1 + 1))) × 3) − (2 + (1 + 1))';

  public form: FormGroup;
  public isFormCheck = false;
  public convertPrefixResult = '';
  public convertPostResult = '';
  public prefixHistory: StackHistoryUtility = new StackHistoryUtility('');
  public postHistory: StackHistoryUtility = new StackHistoryUtility('');
  public prefixResult: number;
  public postResult: number;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      expressInfix: new FormControl(this.exampleData, [Validators.required, expressionValidator()]),
    });
    this.form.valueChanges.subscribe(
      result => {
        this.convertPrefixResult = '';
        this.convertPostResult = '';
        this.prefixHistory = null;
      }
    );
  }

  public convert(): void {
    this.isFormCheck = true;
    if (this.form.valid) {
      const infix = this.form.controls['expressInfix'].value;
      const polishNotationAlgorithm: PolishNotationAlgorithm = new PolishNotationAlgorithm(infix);
      this.convertPrefixResult = polishNotationAlgorithm.getPrefix(true);
      this.prefixHistory = polishNotationAlgorithm.getHistory();
      this.convertPostResult = polishNotationAlgorithm.getPostfix(true);
      this.postHistory = polishNotationAlgorithm.getHistory();
    }
  }

  public clear(): void {
    this.form.controls['expressInfix'].setValue('');
    this.convertPrefixResult = '';
    this.convertPostResult = '';
    this.prefixHistory = null;
  }

  public addExample(): void {
    this.form.controls['expressInfix'].setValue(this.exampleData);
  }

  public getCodemirrorConfig(lang: string) {
    return {
      lineNumbers: true,
      mode: lang,
      matchBrackets: true,
      styleActiveLine: true,
      extraKeys: {'Alt-F': 'findPersistent'}
    };
  }

}
