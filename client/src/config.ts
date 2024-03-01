export const MAIN_ROUTE_API = {
  GET_TICKETS: '/api/tickets',
  GET_USERS: '/api/users',
  ASSIGN_USER: '/api/tickets/{ticketId}/assign/{userId}',
  UNASSIGN_USER: '/api/tickets/{ticketId}/unassign',
  COMPLETE_TICKET: '/api/tickets/{ticketId}/complete',
};

export const STATUS_TICKETS = {
  ALL: 'all',
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete',
};
