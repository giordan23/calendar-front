import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
    return async (dispatch, getState) => {

        try {

            const {uid, name} = getState().auth;

            const resp = await fetchConToken( 'events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event));
                console.log(event);
            }

        } catch (error) {
            console.log(error);
        }
    }
};



export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

//Actualizar Evento Fetch

export const eventStartUpdating = ( event ) => {
    return async (dispatch) => {

        try {

            // const {uid} = getState().auth;
            // const euid = event.user._id; 

            // console.log(uid);
            // console.log(euid);

            // if (uid !== euid) {
            //     return Swal.fire('Error', )
            // }

            const resp = await fetchConToken('events', event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                const event = body.event;
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }


        } catch (error) {
            console.log(error);
        }
    }
};

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('events')
            const body = await resp.json();
            const events = prepareEvents( body.eventos );
            console.log(events);
                dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error);
        }
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

