import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const  loginData = localStorage.getItem("loginData");
  if(loginData !== null) {
    const tokenData = JSON.parse(loginData);
    const token = tokenData.jwt;        //login api result {.. jwt: ...}
    const requestAuthorized = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next(requestAuthorized);
  } else {
    return next(request);
  }
};