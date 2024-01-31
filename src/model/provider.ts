import ConfigModel from './Config.model';
import MessageModel from './Message.model';
import EventModel from './Event.model';

const eventModel = new EventModel('event');
const configModel = new ConfigModel('config');
const messageModel = new MessageModel('messages');

export { eventModel, configModel, messageModel, };
