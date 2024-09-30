import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'M2M-Wiki-count-links';

  constructor(private modalService: NgbModule){}
  onSubmit(){
    console.log('submitting');
    
  }
  public open(modal: any): void {
    this.modalService;
  }

}
