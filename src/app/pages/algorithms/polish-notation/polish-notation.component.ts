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

  constructor() {}

  ngOnInit() {
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
