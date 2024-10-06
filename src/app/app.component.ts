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

      //!!!ALERT%%%%%%%%%%%%%% if not "concatMap"(RXJS) is used -> doing call of the second request and logic for comparing from the first result
      const searchTerm = this.extractSearchTerm(this.wiki_form.value.to_comparable) != "not propper weblink" ? this. extractSearchTerm(this.wiki_form.value.to_comparable)[1] : "not propper weblink";
      
      this.getDataToComparableAction(searchTerm, data);
      },
      (error) => {
        this.flag_error=true;
          console.log(error)
          alert(`Coudnt find results===${error.message}`);
      },
      () => {
          console.log('complete getting data from first search term', )
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
        console.log('complete getting data from second search term', )
    });
  }

  extractSearchTerm(url:string){
      
    const expression = /wiki\/(.*)/;
    const stringEvaluation   =  url.match(expression); //this is the search term extracted 

    const result = stringEvaluation ==null? "not propper weblink":stringEvaluation;

    return result;
  }

  getHtmlPageRespons(searchTerm:string) {
    this.dataService.getHtmlForScrubing(searchTerm).subscribe(
      (data) => {
      this.flag_no_error=true;
      const searchTerm = this.extractSearchTerm(this.wiki_form.value.to_comparable) != "not propper weblink" ? this. extractSearchTerm(this.wiki_form.value.to_comparable)[1] : "not propper weblink";

      console.log(data);
      
       
      },
      (error) => {
        this.flag_error=true;
          console.log(error)
          alert(`Coudnt find results===${error.message}`);
      },
      () => {
          console.log('complete getting data from inner link search term', )
      });
  }

  searchHTMLForReferences() {

  }

  onSubmit(){
    console.log('%c submitting', 'color:purple; font-size:16px;font-weight:900;' ,this.wiki_form.value.compare, this.wiki_form.value.to_comparable);

    const searchTerm = this.extractSearchTerm(this.wiki_form.value.compare) != "not propper weblink" ? this. extractSearchTerm(this.wiki_form.value.compare)[1] : "not propper weblink";
    console.log(searchTerm);

    this.getHtmlPageRespons(searchTerm);
    
    //conditions for filling in the field compare and to_comparable
    //can have a debounce for sending request each 300 ms
    // can have dropdown with suggestions

    //logic of the problem -> first input have to finish in order the socond to execute .  This means to implement concatMap();

    //send action with the first request 
    if (searchTerm != "not propper weblink") {
      this.getDataCompareAction(searchTerm);
      
    } else {
      alert( searchTerm+"."+"\nExample:  en.wikipedia.org/wiki/search_term.");
    }


    // console.log(this.flag_no_error)

    // if (this.flag_no_error) {


    // } else {
    //   alert('No results')
    // }
    
    
    
  }

}

