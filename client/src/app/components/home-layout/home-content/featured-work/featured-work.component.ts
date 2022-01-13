import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mbp-featured-work',
    templateUrl: './featured-work.component.html',
    styleUrls: ['./featured-work.component.scss'],
})
export class FeaturedWorkComponent implements OnInit {
    index = 1;
    names = ['Drakkar', 'Some building', 'SPAWN'];

    constructor() {}

    ngOnInit(): void {}
}
