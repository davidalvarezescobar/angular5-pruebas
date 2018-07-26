import { Injectable } from '@angular/core';
import { CommonConstants } from './../../config/constants';

@Injectable()
export class ModalService {

  constructor() { }

  static modalNoAvailable(): string {
    let message = CommonConstants.MESSAGES.session[sessionStorage.getItem(CommonConstants.KEY_LANGUAGE)];
    let html = '<style>.error-app { margin: 32px; padding: 32px; text-align: center }</style><div class="text-center error-app nwe_panel-body"><img src="assets/images/ICON_ALERT.svg" /><h2>' + message + '</h2></div>';
    return html;
  }

  static modalSessionEnd(): string {
    let message = CommonConstants.MESSAGES.auth[sessionStorage.getItem(CommonConstants.KEY_LANGUAGE)];
    let html = document.body.innerHTML = '<style>.nwe_session-error .fa-times-circle-o{color: #f80807 ; font-size: 26px;}.nwe_session-error .fa-exclamation-triangle{color: #FFBF00 ; font-size: 40px; margin-left: 10px;}.modal-body.body_session-error{padding-left: 35px;}.nwe_session-error .text-session-error{color: #333; display: inline-block; vertical-align: top; font-size: 16px; margin: 10px 0 20px 10px; width: 80%;}.nwe_session-error h2{display: block; font-size: 24px; font-weight: bold; margin: 25px 0 20px 10px;}.dialog-overlay{background: rgba(0, 0, 0, .4); -webkit-backface-visibility: hidden; -webkit-animation: dialog-fadein .5s; animation: dialog-fadein .5s;}</style><main id="nwe_popup_error" class="nwe_popup_error"> <div class="modal fade in nwe_session-error dialog-overlay" role="dialog" aria-labelledby="modal-title-top" aria-describedby="modal-body-top" size="sm" index="0" animate="animate" tabindex="-1" modal-animation="true" style="z-index: 1050; display: block;"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body body_session-error"> <div class="dialog-overlay"></div><span class="fa fa-times-circle-o right" aria-hidden="true" onclick="document.getElementById(\'nwe_popup_error\').innerHTML=null;"></span> <h2>AVISO</h2> <span class="fa fa-exclamation-triangle"></span> <p class="text-session-error"> ' + message + ' </p><br></div></div></div></div>';
    return html;
  }

}
