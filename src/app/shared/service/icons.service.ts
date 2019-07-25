import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, AlertDialogComponent, InputDialogComponent, LoadingDialogComponent } from '../directive/alert';

@Injectable()
export class IconsService {

    constructor() {
    }

    getSVGIcons(): string[] {
        return [
            'package',
            'qrcode',
            'speedometer',
            'box',
            'users',
            'routes',
            'location',
            'cancel',
            'rating',
            'growth',
            'route',
            'star',
            'thumbstars',
            'deliverytruck'
        ];

    }

}
