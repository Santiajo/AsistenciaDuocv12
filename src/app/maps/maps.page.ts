import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

    map: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var myLatlng = new google.maps.LatLng(-33.694162620465455, -71.21368061250298);
    
    var mapOptions = {
      zoom: 16,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: myLatlng
    });
    
    marker.setMap(map);
  }
}
