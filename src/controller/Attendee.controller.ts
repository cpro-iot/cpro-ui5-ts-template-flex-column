import BaseController from './BaseController';
import { configModel, eventModel, messageModel } from '../model/provider';

/**
 * @namespace cpro.ui5.__kunde__.__projekt__.controller.Steps
 */
export default class StepsController extends BaseController {
  onInit() {
    eventModel.register(this);
    messageModel.register(this);
  }

  onCloseAttendeeDetails() {
    const activeEvent = eventModel.getActiveItem();
    configModel.setLayout('TwoColumnsMidExpanded');
    this.getRouter().navTo('event', { eventId: activeEvent.eventId });
  }
}