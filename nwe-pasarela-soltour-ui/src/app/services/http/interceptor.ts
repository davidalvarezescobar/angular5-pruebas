import { PreloaderService } from './preloader.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, map, finalize } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private preloaderService: PreloaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.preloaderService.showLoader();

        return next.handle(req).pipe(
            finalize(() => {
                this.preloaderService.hideLoader();
            })
        );
    }
}
