import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NgbModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'M2M-Wiki-count-links';
  first = '';
  wiki_form:FormGroup;
  dataService;
  
  constructor(private modalService: NgbModule,  dataService: DataService,private fb:FormBuilder)
      {
        this.dataService = dataService;
        // this.wiki_form=new this.FormGroup;
        console.log(this.dataService.getData());
           this.wiki_form = new FormGroup({
      compare:new FormControl(''),
      to_comparable:new FormControl('',Validators.minLength(2))
    }); 
      }
  
  ngOnInit() {
    console.log('ng on init')
    
  
  }

  getDataCompareAction(){
    this.dataService.getData().subscribe(
      (data) => {
  console.log(data);
    this.first = data;
    },
    (error) => {
        console.log(error)
    },
    () => {
        console.log('complete', this.first)
    });
  }  

  getDataToComparableAction(){
    this.dataService.getData().subscribe(
      (data) => {
  console.log(data);
    this.first = data;
    },
    (error) => {
        console.log(error)
    },
    () => {
        console.log('complete', this.first)
    });
  }
  onSubmit(){
    console.log('submitting' ,this.wiki_form.value.compare, this.wiki_form.value.to_comparable);
    
    //conditions for filling in the field compare and to_comparable
    //can have a debounce for sending request each 300 ms
    // can have dropdown with suggestions

    //logic of the problem -> first input have to finish in order the socond to execute .  This means to implement concatMap();

    //send action with the first request 


    
  }

}

