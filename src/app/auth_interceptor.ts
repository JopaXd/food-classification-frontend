import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
	constructor(private userSvc:UserService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
		return next.handle(req).pipe(catchError(error => {
			//Consider adding users/me to this list.
			if (error instanceof HttpErrorResponse && !req.url.includes('/refresh') && !req.url.includes("/authenticate") && error.status === 401){
				return this.handleAuthError(req, next);
			}
			return throwError(error);
		}));
	};
	private handleAuthError(request: HttpRequest<any>, next: HttpHandler){
		return this.userSvc.refreshToken().pipe(switchMap((refresh:any) => {
			return next.handle(request.clone());
		}));
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
];