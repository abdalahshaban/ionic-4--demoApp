import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false
  isLogin = true
  constructor(private authSer: AuthService, private router: Router,
    private loadCtrl: LoadingController,
    private menuCtrl: MenuController,
    private navCtrL: NavController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'm1')
  }

  onLogin() {
    this.isLoading = true
    this.authSer.login()
    this.loadCtrl.create({
      keyboardClose: true,
      message: 'Logging in ...',
      mode: 'ios',
      spinner: 'crescent'
    }).then(loadingEl => {
      loadingEl.present()
      setTimeout(() => {
        this.isLoading = false
        loadingEl.dismiss()
        this.router.navigate(['/places', 'tabs', 'discover'], { replaceUrl: true })
        // this.navCtrL.navigateRoot(['/places', 'tabs', 'discover'])
        this.menuCtrl.enable(true, 'm1')
      }, 1500);
    })




  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email;
    const password = form.value.password

    console.log(email, password);

    if (this.isLogin) {
      //Send a request to login services
    } else {
      // Send a request to signup services
    }
  }

}
