import { ModalService } from './../../../services/modal/modal.service';
import { ErrorSetup } from './ErrorSetup';

export class ErrorSetupConfig implements ErrorSetup {
  showError() {
    document.body.innerHTML = ModalService.modalNoAvailable();
  }
}
