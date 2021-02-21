import { AfterContentInit, Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ObservableInput } from 'ngx-observable-input';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'app-todo-table-three',
  templateUrl: '../todo-table/todo-table.component.html',
  styleUrls: ['../todo-table/todo-table.component.scss']
})
export class TodoTableThreeComponent implements AfterContentInit, OnDestroy {

  /**
   * 1. Uso de pacote externo [ngx-observable-input];
   * 2. Precisa usar pipe async para passar observable pro input;
   * 3. Está acontencendo o efeito de piscar (?*)
   * 4. subscrevendo 2 vezes (?*) 
   */
  @ObservableInput() @Input("source") source$: Observable<Array<any>>;
  displayedColumns: Array<string> = [
    'id',
    'title',
    'description',
    'completed'
  ];
  public dataSource: MatTableDataSource<any>;
  length: number = 0;
  hidden: boolean;
  count = 0;
  private unsubscribe$ = new Subject<void>();
  constructor() { }


  ngAfterContentInit(): void {
    this.source$
      .pipe(
        tap(list => this.length = list?.length),
        map(list => new MatTableDataSource(list)),
        takeUntil(this.unsubscribe$),
      ).subscribe(data => {
        this.dataSource = data;
        console.log('THREE', this.count++);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
