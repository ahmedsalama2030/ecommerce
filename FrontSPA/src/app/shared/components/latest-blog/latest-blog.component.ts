import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

 

@Component({
  selector: 'eg-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.css']
})
export class LatestBlogComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}
