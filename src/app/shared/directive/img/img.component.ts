import { Component, OnInit, EventEmitter, OnChanges, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { AuthService } from '../../service/auth.service';
import { AppSettings } from '../../model';

@Component({
    selector: 'app-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges {
    @Input() src: string;
    @Input() memberPicture: boolean;
    @Input() width = '100%';
    @Input() height = '100%';
    @Input() circle: boolean;
    @Input() alt = 'pic';
    imageSrc = './assets/img/page-loader.gif';
    errorSrc = './assets/img/default_img.jpg';

    constructor(
        private http: Http,
        private sanitizer: DomSanitizer,
        private authService: AuthService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.src) {
            if (`${this.src}`.indexOf('http') > -1 || this.memberPicture) {
                this.getImage().subscribe(
                    image => {
                        this.imageSrc = image;
                    },
                    (error) => {
                        this.imageSrc = this.errorSrc;
                    }
                );
            } else {
                this.imageSrc = this.src;
            }
        }
    }

    getImage(): Observable<string> {
        if (this.memberPicture) {
            this.src = `${AppSettings.SERVER}/People/${this.src}/Picture`;
        }
        return this.http.get(this.src, this.authService.requestOptions())
            .map((res: Response) => {
                return res.json().image;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log('Image ERROR:', error.toString());
        return Observable.throw(error.json().error || 'Image Error');
    }

}
