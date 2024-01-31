import BaseController from './BaseController';
import { messageModel, configModel, eventModel } from '../model/provider';
import Event from 'sap/ui/base/Event';
import ManagedObject from 'sap/ui/base/ManagedObject';
import MessageToast from 'sap/m/MessageToast';

/**
 * @namespace cpro.ui5.__kunde__.__projekt__.controller.Event
 */
export default class EventController extends BaseController {
  onInit() {
    eventModel.register(this);
    messageModel.register(this);
    eventModel.syncEvents();
    this.getRouter()
      .getRoute('event')
      .attachPatternMatched(this._onObjectMatched, this);
  }

  async _onObjectMatched(oEvent: Event) {
    const { eventId } = oEvent.getParameter('arguments');
    eventModel.setActiveEventFromCollection(eventId);
  }

  onPressAttendeeTableItem(event: Event) {
    configModel.setLayout('ThreeColumnsMidExpanded')
    const attendeePath = (event.getSource() as ManagedObject)
      .getBindingContext('event')
      .getPath();
    const attendeeItem = eventModel.getProperty(attendeePath);
    const eventItem = eventModel.getActiveItem();
    eventModel.setActiveAttendeeFromActiveEvent(attendeeItem.userId);
    this.getRouter().navTo('attendee', { eventId: eventItem.eventId, userId: attendeeItem.userId });
  }

  onCloseEventDetails() {
    configModel.setLayout('OneColumn')
    this.getRouter().navTo('home');
  }
}
