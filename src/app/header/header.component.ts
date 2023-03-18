import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true
    private userSub: Subscription
    isAuthenticated = true

    constructor(
        private dataService: DataStorageService,
        private authService: AuthService) {}
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user
        })
    }
    onSaveData() {
        this.dataService.storeRecipes()
    }

    onFetchData() {
        this.dataService.fetchRecipes().subscribe()
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }

    
}