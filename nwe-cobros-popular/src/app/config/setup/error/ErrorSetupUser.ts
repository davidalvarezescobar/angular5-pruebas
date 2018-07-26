import { ErrorSetup } from './ErrorSetup';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from './../../../services/modal/modal.service';

export class ErrorSetupUser implements ErrorSetup {

  constructor(private error: HttpErrorResponse) {}

  showError(): void {
    if (this.error.status === 401) {
      document.body.innerHTML = ModalService.modalSessionEnd();
    }

    document.body.innerHTML = ModalService.modalNoAvailable();
  }

}
