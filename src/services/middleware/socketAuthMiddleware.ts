import { getCookie } from "../../utils/cookie";

export const socketAuthMiddleware = (
  wsUrl: string,
  wsActions: {
    wsInit: any;
    onOpen: any;
    onClose: any;
    onError: any;
    onData: any;
  }
) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) =>
      (action: { type: any; payload: any }) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onData } = wsActions;
        const accessToken = getCookie("accessToken")?.split(" ")[1];
        if (type === wsInit && accessToken) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onData, payload: restParsedData });
          };

          socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
          };

          if (type === onData) {
            const message = { ...payload };
            socket.send(JSON.stringify(message));
          }
        }

        next(action);
      };
  };
};
