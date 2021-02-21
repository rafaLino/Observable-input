import { AfterContentInit, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements AfterContentInit {
  /**
   * 1. O Componente é inicializado toda vez que o botão 'refresh' é acionado.
   * 2. O Component não é exibido enquanto não existir os dados.
   * 3. Está acontencendo o efeito de piscar no componente. 
   */
  @Input() source: Array<any>;
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
  constructor() { }

  ngAfterContentInit(): void {
    console.log("ONE ", this.count++);
    this.length = this.source.length;
    this.dataSource = new MatTableDataSource(this.source);
  }

}
