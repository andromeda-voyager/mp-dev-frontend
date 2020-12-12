import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-website';
  navLinks: string[] = ["/resume", "/interests", "chess", "/recommend-books"];
  showSideNav:boolean = false;

  constructor(private router:Router) {
    this.router.events.subscribe((event) => {
      this.showSideNav = false;
    });
    
  }
  toggleSideNavOnClick(){
    this.showSideNav = this.showSideNav == true ? false: true;
  }

}
