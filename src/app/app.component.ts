import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'M2M-Wiki-count-links';
  first = '';
  
  constructor(private modalService: NgbModule, private dataService: DataService)
      {
        
        console.log(this.dataService.getData());
      }
  
  ngOnInit() {
    console.log('ng on init')
    this.dataService.getData().subscribe({
      next: (data) => {
          this.first = data;
      },
      error: (error) => {
          console.log(error)
      },
      complete: () => {
          console.log('complete', this.first)
      }
    })      
  }
  onSubmit(){
    console.log('submitting');
    
  }
  // public open(modal: any): void {
  //   this.modalService;
  // }

}

