import { AddWorkDialogHeaderComponent } from './add-work-dialog/add-work-dialog-header/add-work-dialog-header.component';
import { AddWorkDialogComponent } from './add-work-dialog/add-work-dialog.component';
import { Component, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'mbp-works-list',
    templateUrl: './works-list.component.html',
    styleUrls: ['./works-list.component.scss'],
})
export class WorksListComponent {
    private readonly dialog = this.dialogService.open<any>(
        new PolymorpheusComponent(AddWorkDialogComponent, this.injector),
        {
            header: new PolymorpheusComponent(
                AddWorkDialogHeaderComponent,
                this.injector
            ),
            size: 'l',
        }
    );

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector
    ) {}

    addDialog(): void {
        this.dialog.subscribe();
    }
}
