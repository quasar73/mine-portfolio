import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector: 'mbp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Shearon';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        const appTitle = this.titleService.getTitle();
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let child = this.activatedRoute.firstChild;
                    while (child?.firstChild) {
                        child = child.firstChild;
                    }
                    if (child?.snapshot?.data['title']) {
                        return child.snapshot.data['title'];
                    }
                    return 'Page';
                })
            )
            .subscribe((ttl: string) => {
                this.titleService.setTitle(`${this.title} | ${ttl}`);
            });
    }
}
