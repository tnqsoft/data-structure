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

@Component({
  selector: 'app-polish-notation',
  templateUrl: './polish-notation.component.html',
  styleUrls: ['./polish-notation.component.scss']
})
export class AlgorithmPolishNotationComponent implements OnInit {

  public jsContent = `class Greeter {
    greeting: string;
    constructor (message: string) {
      this.greeting = message;
    }
    greet() {
      return "Hello, " + this.greeting;
    }
  }

  var greeter = new Greeter("world");

  var button = document.createElement('button')
  button.innerText = "Say Hello"
  button.onclick = function() {
    alert(greeter.greet())
  }

  document.body.appendChild(button)

  `;

  public contentPhp = `<?php
  echo "Hello world!";
  `;

  form: FormGroup;
  isFormCheck = false;
  convertPrefixResult = '';
  convertPostResult = '';

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      expressInfix: new FormControl('', Validators.required),
    });
  }

  public convert(): void {
    this.isFormCheck = true;
    if (this.form.valid) {
      const infix = this.form.controls['expressInfix'].value;
      const polishNotationAlgorithm: PolishNotationAlgorithm = new PolishNotationAlgorithm(infix);
      this.convertPrefixResult = polishNotationAlgorithm.getPrefix(true);
      this.convertPostResult = polishNotationAlgorithm.getPostfix(true);
    }
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
