import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { concatMap, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputComponent } from "./input/input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgbModule, ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'M2M-Wiki-count-links';

  wiki_form:FormGroup;
  dataService;
  // private searchTerm:string;
  flag_no_error:boolean;
  flag_error:boolean;
  name_of_actor1:String[];
  name_of_actor2:any;
  
  constructor(private modalService: NgbModule,  dataService: DataService,private fb:FormBuilder)
      {
        this.name_of_actor1=[""];
        this.name_of_actor2=[];
        this.flag_error=false;
        this.flag_no_error=false;
        // this.searchTerm='';
        this.dataService = dataService;
        // this.wiki_form=new this.FormGroup;
           this.wiki_form = new FormGroup({
      compare:new FormControl(''),
      to_comparable:new FormControl('',Validators.minLength(2))
    }); 
      }
  
  ngOnInit() {
    console.log('ngOnInit eg. component created ')
  }

  getDataCompareAction(searchTerm:string) {
    this.dataService.getData(searchTerm).subscribe(
      (data) => {
      this.flag_no_error=true;
      this.name_of_actor1 = data[1];
      console.log(this.flag_no_error);

      //if not "concatMap" is used -> doing call of the second request and logic for comparing from the first result
      this.getDataToComparableAction(this.wiki_form.value.to_comparable, data);

    },
    (error) => {
      this.flag_error=true;
        console.log(error)
        alert(`Coudnt find results===${error.message}`);
    },
    () => {
        console.log('complete', )
    });
  }  

  getDataToComparableAction(searchTerm:string, data_from_compare:any){
    this.dataService.getData(searchTerm).subscribe(
      (data) => {
      this.flag_no_error=true;
      console.log(this.flag_no_error);
      this.name_of_actor2 = data[1];
      data_from_compare;
    },
    (error) => {
      this.flag_error=true;
        console.log(error)
        alert(`Coudnt find results===Message:${error.message}`);

    },
    () => {
        console.log('complete', )
    });
  }
  

  

  onSubmit(){
    console.log('submitting' ,this.wiki_form.value.compare, this.wiki_form.value.to_comparable);
    
    //conditions for filling in the field compare and to_comparable
    //can have a debounce for sending request each 300 ms
    // can have dropdown with suggestions

    //logic of the problem -> first input have to finish in order the socond to execute .  This means to implement concatMap();

    //send action with the first request 
    this.getDataCompareAction(this.wiki_form.value.compare);


    console.log(this.flag_no_error)

    // if (this.flag_no_error) {


    // } else {
    //   alert('No results')
    // }
    
    
    
  }

}

