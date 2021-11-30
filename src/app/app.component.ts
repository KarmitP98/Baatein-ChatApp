import { UserModel } from './models/UserModel';
import { UserService } from './services/user.service';
import { setUserAction, removeUserAction } from './store/user/user.actions';
import { SET_AUTH, SetAuthAction, RemoveAuthAction } from './store/auth/auth.actions';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Store } from '@ngrx/store';

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private afa: AngularFireAuth,
        private store: Store<any>,
        private userService: UserService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async ngOnInit() {
        await this.fetchAuthState();
    }

    ngOnDestroy() {

    }

    fetchAuthState = async () => {
        await this.afa.onAuthStateChanged(async next => {
            if (next) {

                this.store.dispatch(new SetAuthAction(next))

                // this.userService.fetchUserByUId(next.uid).get().then((snapShot) => {
                //     console.log({ snapShot });

                //     // if (!user.empty) {
                //     //     console.log(user.docs[0].data());

                //     //     this.store.dispatch(new setUserAction(user.docs[0].data()))
                //     // }
                // })
            }
            else {
                this.store.dispatch(new RemoveAuthAction(undefined))
                // this.store.dispatch(new removeUserAction(undefined))
            }
        })
    }


}
