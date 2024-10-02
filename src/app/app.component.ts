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
      }
    )    ;
  
  }
  onSubmit(){
    console.log('submitting');

    
  }
  // public open(modal: any): void {
  //   this.modalService;
  // }

}

