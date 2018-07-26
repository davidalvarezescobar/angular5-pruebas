import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    // sólo utilizo el interceptor para logear pero,
    // lógicamente se puede hacer todo tipo de modificaciones a la petición http y a la respuesta hhtp
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe( 
            // con un tap, sólo podemos modificar la respuesta http
            tap(_x => console.log('Interceptor: sólo respuesta', _x)),
            map( this.logIntercept(req) ) 
        ); 
    }

    // con una función que retorna una función, podemos...
    logIntercept(req) {
        console.log('Interceptor request:', req); // ...modificar la petición http
        return (res: HttpEvent<any>) => {
            console.log('Interceptor response:', res); // ...y también modificar la respuesta http
            return res;
        }
    }

}
