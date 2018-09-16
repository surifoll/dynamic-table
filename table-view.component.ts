import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  receivedData: any[];
  newList: any[];
  columnDef: any[];
  newColumnDef: any[];
  arrayOfKeys: any[];
  
  constructor() {
    this.receivedData = [
      { position: 1, name: 'Hydro', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
      { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
      { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
      { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
      { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
      { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
      { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
      { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
      { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
      { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
      { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
    ];

    this.columnDef = [
      { canShow: true, name: 'position', },
      { canShow: true, name: 'name', },
      { canShow: false, name: 'weight', },
      { canShow: true, name: 'symbol', }
    ];
   
    this.newColumnDef = this.getEnabledProperties(this.columnDef);
    this.initialize();
  }

  getEnabledProperties = (obj) => {
    return obj.filter(element => element.canShow !== false)
  };

  initialize = () => {
    this.newList = [];
    this.arrayOfKeys = this.receivedData;
    this.newColumnDef = this.getEnabledProperties(this.columnDef);

    console.log(this.receivedData, "aaaaa");
    this.arrayOfKeys.forEach((a) => {
      console.log(a, "aaaaa");
      var res = this.filterObjectProperties(a)
      this.newList.push(res);
      return res;
    });
  }

  filterObjectProperties = (obj) => {
    let util = new Util();
    let result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (util.inArray(key, this.newColumnDef.map(a => a.name))) {
          result[key] = element;
        }
        else {
        }
      }
    }
    return result;
  }
  addColumn = (obj) => {
    var val = this.columnDef.findIndex(x => x.name =='weight');
    console.log(val);
    this.columnDef[val].canShow = !this.columnDef[val].canShow;
    this.initialize();
    console.log(this.newColumnDef);
    
  };

  ngOnInit() {

  }

}
class Util {
  public inArray = (target, array) => {

    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return true;
      }
    }

    return false;
  }
}

@Pipe({
  name: 'appProperties'
})
export class PropertiesPipe implements PipeTransform {
  transform(obj: any): Object[] {
    let newObj = [];
    for (let key of Object.keys(obj)) {
      let mealName = obj[key];
      // ... do something with mealName
      newObj.push(mealName);
      // console.log(mealName);
    }

    return newObj;
  }
   
}