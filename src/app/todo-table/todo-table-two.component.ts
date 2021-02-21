import { AfterContentInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-todo-table-two',
  templateUrl: '../todo-table/todo-table.component.html',
  styleUrls: ['../todo-table/todo-table.component.scss'],
})
export class TodoTableTwoComponent implements AfterContentInit, OnChanges, OnDestroy {

  /**
   * 1. Necessidade de "duplicar" o código ngOnChanges e ngAfterContentInit
   * 2. ngOnChanges é chamado em toda mudança do input do componente.
   *    portanto, precisa checar se a mudança foi no @input correto (source no caso) e se não é a primeira vez.
   */
  @Input() source: Observable<Array<any>>;
  displayedColumns: Array<string> = [
    'id',
    'title',
    'description',
    'completed'
  ];
  public dataSource: MatTableDataSource<any>;
  length: number;
  hidden: boolean;
  count = 0;
  countChanges = 0;

  subscription = new Subscription();
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("TWO [ngOnChanges]", this.countChanges++);
    if (changes.source && !changes.source.isFirstChange()) {
      this.subscription.add(this.source.subscribe(list => {
        this.length = list.length;
        this.dataSource = new MatTableDataSource(list);
      }));
    }
  }

  ngAfterContentInit(): void {
    this.subscription.add(this.source
      .pipe(
        tap(list => this.length = list.length),
        map(list => new MatTableDataSource(list))
      ).subscribe(data => {
        this.dataSource = data;
        console.log("TWO", this.count++)
      }
      ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
