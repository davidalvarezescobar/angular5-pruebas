import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { map, delay, tap, finalize } from 'rxjs/operators';
import { PreloaderService } from "./preloader.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private preloaderService: PreloaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.preloaderService.showLoader();

        return next.handle(req)
            .pipe(
                map( this.logger(req) ),
                finalize( this.end() )
            ); 

        // ANGULAR HttpClient doc way
        //
        // const started = Date.now();
        // let ok: string;
        // return next.handle(req)
        //     .pipe(
        //         tap(
        //             // Operation OK
        //             event => {
        //                 ok = event instanceof HttpResponse ? 'succeeded' : '';
        //             },
        //             // Operation KO; error is an HttpErrorResponse
        //             error => {
        //                 ok = 'failed'
        //             }
        //         ),
        //         // Log when response observable either completes or errors
        //         finalize(() => {
        //             const elapsed = Date.now() - started;
        //             const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        //             console.log(msg);
        //             this.preloaderService.hideLoader();
        //         })
        //     );
    }

    // My way
    logger(req) {
        console.log('Interceptor request:', req);
        return (res: HttpEvent<any>) => { // callback function
            console.log('Interceptor response:', res);
            return res; // si en lugar de llamar a ésta función 'logger' desde un 'map',
                        // la llamamos desde un 'tap', no haría falta hacer un return
        }
    }

    end() {
        return () => { // calback function
            this.preloaderService.hideLoader();
        }
    }
}
