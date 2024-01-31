import BaseModel from "./BaseModel";

interface Attendee {
  userId: number;
  name: string;
  registrationStatus: 'Pending' | 'Confirmed';
  image: string; // Placeholder image URL
}

interface IEvent {
  eventId: number;
  eventName: string;
  description: string;
  mainTopic: string;
  date: string;
  location: string;
  attendees: Attendee[];
}


const events: IEvent[] = [
  {
    "eventId": 1,
    "eventName": "Tech Conference",
    "description": "A conference on the latest in technology",
    "mainTopic": "Emerging Technologies",
    "date": "2024-02-15",
    "location": "City Convention Center",
    "attendees": [
      { "userId": 1, "name": "John Doe", "registrationStatus": "Confirmed", "image": "https://example.com/john_image.jpg" },
      { "userId": 2, "name": "Jane Smith", "registrationStatus": "Pending", "image": "https://example.com/jane_image.jpg" },
      { "userId": 3, "name": "Bob Johnson", "registrationStatus": "Confirmed", "image": "https://example.com/bob_image.jpg" },
      { "userId": 4, "name": "Emily Brown", "registrationStatus": "Pending", "image": "https://example.com/emily_image.jpg" }
    ]
  },
  {
    "eventId": 2,
    "eventName": "Networking Mixer",
    "description": "An event for networking and socializing",
    "mainTopic": "Professional Networking",
    "date": "2024-02-20",
    "location": "Downtown Lounge",
    "attendees": [
      { "userId": 5, "name": "Alex Green", "registrationStatus": "Confirmed", "image": "https://example.com/alex_image.jpg" },
      { "userId": 6, "name": "Megan White", "registrationStatus": "Confirmed", "image": "https://example.com/megan_image.jpg" },
      { "userId": 7, "name": "Chris Davis", "registrationStatus": "Pending", "image": "https://example.com/chris_image.jpg" },
      { "userId": 8, "name": "Sophie Lee", "registrationStatus": "Confirmed", "image": "https://example.com/sophie_image.jpg" }
    ]
  },
  {
    "eventId": 3,
    "eventName": "Design Workshop",
    "description": "Hands-on workshop for creative design",
    "mainTopic": "Graphic Design",
    "date": "2024-03-05",
    "location": "Creative Studio",
    "attendees": [
      { "userId": 9, "name": "David Miller", "registrationStatus": "Confirmed", "image": "https://picsum.photos/200/300?random=9" },
      { "userId": 10, "name": "Emma Wilson", "registrationStatus": "Confirmed", "image": "https://picsum.photos/200/300?random=10" },
      { "userId": 11, "name": "Michael Taylor", "registrationStatus": "Pending", "image": "https://picsum.photos/200/300?random=11" },
      { "userId": 12, "name": "Olivia Hall", "registrationStatus": "Confirmed", "image": "https://picsum.photos/200/300?random=12" }
    ]
  },
  {
    "eventId": 4,
    "eventName": "Startup Pitch Night",
    "description": "Showcasing innovative startup ideas",
    "mainTopic": "Entrepreneurship",
    "date": "2024-03-15",
    "location": "Innovation Hub",
    "attendees": [
      { "userId": 13, "name": "Isaac Carter", "registrationStatus": "Pending", "image": "https://picsum.photos/200/300?random=13" },
      { "userId": 14, "name": "Ava Robinson", "registrationStatus": "Confirmed", "image": "https://picsum.photos/200/300?random=14" },
      { "userId": 15, "name": "Ryan Garcia", "registrationStatus": "Confirmed", "image": "https://picsum.photos/200/300?random=15" },
      { "userId": 16, "name": "Lily Moore", "registrationStatus": "Pending", "image": "https://picsum.photos/200/300?random=16" }
    ]
  }
]


export default class EventModel extends BaseModel<IEvent> {
  setActiveEventFromCollection(eventId: number) {
    const activeEvent = this.getCollection().find((event) => {
      return event.eventId == eventId;
    });
    this.setActiveItem(activeEvent);
  }

  setActiveAttendeeFromActiveEvent(userId: number) {
    const activeAttendee = this.getActiveItem().attendees.find((attendee) => {
      return attendee.userId == userId;
    });
    this.setActiveAttendee(activeAttendee);
  }

  setActiveAttendee(attendee: Attendee) {
    this.setProperty('/activeAttendee', attendee);
  }

  syncEvents() {
    this.setCollection(events);
  }
}