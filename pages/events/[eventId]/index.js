import { getEventById, getAllEvents } from "../../../helpers/api-utils";

import EventSummary from "../../../components/eventDetail/event-summary";
import EventLogistics from "../../../components/eventDetail/event-logistics";
import EventContent from "../../../components/eventDetail/event-content";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event.id) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(ctx) {
  const eventId = ctx.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
