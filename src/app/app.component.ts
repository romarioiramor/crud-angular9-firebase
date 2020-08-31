import { CrudService } from './service/crud.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular9-firebase';

  employee: string;
  employeeName: string;
  employeeAge: number;
  employeeAddress: string;
  message: string;

  constructor(public crudservice: CrudService) { }

  ngOnInit() {
    this.crudservice.getAllEmployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()[' name '],
          age: e.payload.doc.data()[' age '],
          address: e.payload.doc.data()[' address ']
        };
      })
      console.log(this.employee);
    });
  }

  CreateRecord() {
    let Record = {};
    Record[' name '] = this.employeeName;
    Record[' age '] = this.employeeAge;
    Record[' address '] = this.employeeAddress;

    this.crudservice.createNewEmployeee(Record).then(res => {

      this.employeeName = '';
      this.employeeAge = undefined;
      this.employeeAddress = '';

      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

  editRecord(Record) {
    Record.isEdit = true;
    Record.editName = Record.name;
    Record.editAge = Record.age;
    Record.editAddress = Record.address;


  }

  updateRecord(recorddata) {
    const record = {};
    record[' name '] = recorddata.editName;
    record[' age '] = recorddata.editAge;
    record[' address '] = recorddata.editAddress;

    this.crudservice.updateEmployee(recorddata.id, record);

    recorddata.isEdit = false;
  }

  deleteRecord(recordid) {
    this.crudservice.deleteEmployee(recordid);
  }

}
