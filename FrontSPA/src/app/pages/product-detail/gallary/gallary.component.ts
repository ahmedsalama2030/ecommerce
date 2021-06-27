import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ProductImage } from 'src/app/core/models/productImage';

@Component({
  selector: 'eg-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {
@Input() productImages?:ProductImage[];
  constructor() { }
  galleryOptions: NgxGalleryOptions[]=[];
  galleryImages: NgxGalleryImage[]=[];
  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 3,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation:  'zoom',
         previewZoom:false,
        imageSize: 'contain' ,
        layout: "thumbnails-top",
        imageAutoPlay: true, 
        imageAutoPlayInterval:10000,
        imageAutoPlayPauseOnHover: true, 
        previewAutoPlay: false, 
        previewAutoPlayPauseOnHover: true,
        previewFullscreen: true,
        previewKeyboardNavigation: true,
        previewRotate: true,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      },
      // max-width 800
      {
        breakpoint: 991,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 25,
        thumbnailsMargin: 10,
        thumbnailMargin: 10,
        thumbnailsColumns: 2,

      },
      // max-width 400
      {
        breakpoint: 768,
       width: '600px',
        height: '600px',
        preview: false,
        thumbnailsColumns: 2,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      },
      {       
         breakpoint: 576,
         width: '600px',
        height: '600px',
        preview: false,
        thumbnailsColumns: 1,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      }
    ];

    this.getImages();


  }

  getImages(){
     
    this.productImages?.forEach(image => {
      this.galleryImages.push(
        {
          small: image.url,
        medium: image.url,
        big: image.url,
        }
      )
    });
  }
}

