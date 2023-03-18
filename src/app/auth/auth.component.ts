import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

    constructor(
        private authService: AuthService, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) {}

    isLoginMode = true;
    isLoading = false;
    error: string = null

    // Angular will find the first intance of the placeholder directive i.e. appPlaceHolder
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
    closeSub: Subscription

    onSwitchMode () {
        this.isLoginMode = !this.isLoginMode
    }

    // ngIf approaach for disp error
    onHandleError() {
        this.error = ''
    }

    // Show error dynamically
    showErrorAlert(message: string) {
        // const alertComp = new AlertComponent()  // This will not work with angular though valid ts code.
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        )
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
        componentRef.instance.message = message
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear()
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe()
        }
    }

    onSubmit(form: NgForm) {
        console.log(form)
        if(!form.valid) {
            return
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            resData => {
              console.log(resData);
              this.isLoading = false;
              this.router.navigate(['/recipes']);
            },
            errorMessage => {
              console.log(errorMessage);
              this.error = errorMessage;
              this.showErrorAlert(errorMessage)
              this.isLoading = false;
            }
          );

        form.reset()
    }

}