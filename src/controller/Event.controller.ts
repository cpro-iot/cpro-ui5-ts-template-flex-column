import BaseController from './BaseController';
import { messageModel, configModel, eventModel } from '../model/provider';
import Event from 'sap/ui/base/Event';
import ManagedObject from 'sap/ui/base/ManagedObject';
import MessageToast from 'sap/m/MessageToast';

/**
 * @namespace cpro.ui5.__kunde__.__projekt__.controller.Todo
 */
export default class TodoController extends BaseController {
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

  onPressAcceptButton() {
    const message = this.getAppResourceBundleText(
      'message-todo-update-success',
    );

    messageModel.addSuccessMessage({ message });
    MessageToast.show(message);
    this.navToHome();
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
