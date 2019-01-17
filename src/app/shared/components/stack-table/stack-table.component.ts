import { Component, OnInit, Input } from '@angular/core';
import { StackHistoryUtility } from '../../data-structure/utility/stack-history.utility';

@Component({
  selector: 'app-stack-table',
  templateUrl: './stack-table.component.html',
  styleUrls: ['./stack-table.component.scss']
})
export class StackTableComponent implements OnInit {
  @Input()
  public isLeftToRight = false;

  @Input()
  public result: string;

  @Input()
  public stackHistory: StackHistoryUtility;

  constructor() { }

  ngOnInit() {
  }

}
