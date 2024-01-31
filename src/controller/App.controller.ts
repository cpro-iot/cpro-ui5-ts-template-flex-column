import Controller from 'sap/ui/core/mvc/Controller';
import { configModel } from '../model/provider';

/**
 * @namespace cpro.ui5.__kunde__.__projekt__.controller.App
 */
export default class AppController extends Controller {
  onInit() {
    configModel.register(this)
    console.log('Init App Controller');
  }
}
