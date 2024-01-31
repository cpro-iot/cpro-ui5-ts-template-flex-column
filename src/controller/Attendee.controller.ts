import BaseController from './BaseController';
import { configModel, eventModel, messageModel } from '../model/provider';
import Button from 'sap/m/Button';

/**
 * @namespace cpro.ui5.__kunde__.__projekt__.controller.Steps
 */
export default class AttendeeController extends BaseController {
  private fullscreen: boolean = false;

  onInit() {
    eventModel.register(this);
    messageModel.register(this);
  }

  onCloseAttendeeDetails() {
    const activeEvent = eventModel.getActiveItem();
    configModel.setLayout('TwoColumnsMidExpanded');
    this.getRouter().navTo('event', { eventId: activeEvent.eventId });
  }

  onToggleAttendeeFullscreen() {
    if (this.fullscreen) {
      this.onCloseAttendeeDetailsFullscreen();
    } else {
      this.onOpenAttendeeDetailsFullscreen();
    }
    this.fullscreen = !this.fullscreen;
  }

  onOpenAttendeeDetailsFullscreen() {
    (this.byId('attendee-fullscreen-button') as Button).setIcon('sap-icon://exit-full-screen');
    const activeEvent = eventModel.getActiveItem();
    const activeAttendee = eventModel.getActiveAttendee();
    configModel.setLayout('EndColumnFullScreen');
    this.getRouter().navTo('attendee', { eventId: activeEvent.eventId, userId: activeAttendee.userId });
  }

  onCloseAttendeeDetailsFullscreen() {

    (this.byId('attendee-fullscreen-button') as Button).setIcon('sap-icon://full-screen');
    const activeEvent = eventModel.getActiveItem();
    const activeAttendee = eventModel.getActiveAttendee();
    configModel.setLayout('ThreeColumnsMidExpanded');
    this.getRouter().navTo('attendee', { eventId: activeEvent.eventId, userId: activeAttendee.userId });
  }
}