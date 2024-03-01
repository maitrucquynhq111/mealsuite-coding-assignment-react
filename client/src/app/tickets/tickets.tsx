import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RequestCreateTicket } from '@acme/shared-models';
import { STATUS_TICKETS, MAIN_ROUTE_API } from '../../config';
import useApp from '../../hooks/useApp';
import CreateDialog from './create-dialog';

export function Tickets() {
  const navigate = useNavigate();
  const { listTickets, listUsers, setListTickets, setLoading } = useApp();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(STATUS_TICKETS.ALL);

  async function fetchTickets() {
    setLoading(true);
    const data = await window.fetch(MAIN_ROUTE_API.GET_TICKETS).then();
    setListTickets(await data.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listTicketFiltered = useMemo(() => {
    switch (status) {
      case STATUS_TICKETS.ALL:
        return listTickets;
      case STATUS_TICKETS.COMPLETE:
        return listTickets.filter((ticket) => ticket.completed === true);
      case STATUS_TICKETS.INCOMPLETE:
        return listTickets.filter((ticket) => ticket.completed === false);
      default:
        return listTickets;
    }
  }, [listTickets, status]);

  const markCompleteTicket = async (id: number) => {
    setLoading(true);
    const url = (MAIN_ROUTE_API.COMPLETE_TICKET || '').replace(
      '{ticketId}',
      id.toString()
    );
    const data = await fetch(url, {
      method: 'PUT', // or 'PUT'
    }).then();
    if (data.ok === true) {
      fetchTickets();
    }
    setLoading(false);
  };

  const submitCreateTicket = async (dataRequest: RequestCreateTicket) => {
    setLoading(true);
    const data = await fetch(MAIN_ROUTE_API.GET_TICKETS || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRequest),
    }).then();
    if (data.ok === true) {
      fetchTickets();
      setOpenDialog(false);
    }
    setLoading(false);
  };

  const chooseStatus = (value: string) => setStatus(value);

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-3xl font-bold text-sky-500">
        List Tickets
      </h2>
      {openDialog && (
        <CreateDialog
          onCloseDialog={() => setOpenDialog(false)}
          submitCreate={submitCreateTicket}
        />
      )}

      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 mt-6 md:flex md:items-center md:justify-between sm:px-6 lg:px-8">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg">
            <button
              onClick={() => chooseStatus(STATUS_TICKETS.ALL)}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                status === STATUS_TICKETS.ALL && 'bg-gray-100'
              } hover:bg-gray-200`}
            >
              View all
            </button>

            <button
              onClick={() => chooseStatus(STATUS_TICKETS.COMPLETE)}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                status === STATUS_TICKETS.COMPLETE && 'bg-gray-100'
              } hover:bg-gray-200`}
            >
              Complete
            </button>

            <button
              onClick={() => chooseStatus(STATUS_TICKETS.INCOMPLETE)}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                status === STATUS_TICKETS.INCOMPLETE && 'bg-gray-100'
              } hover:bg-gray-200`}
            >
              Incomplete
            </button>
          </div>
          <div className="inline-flex overflow-hidden">
            <button
              className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 hover:bg-green-600 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => setOpenDialog(true)}
            >
              Create
            </button>
          </div>
        </div>
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Assignee
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Complete
                  </th>
                </tr>
              </thead>
              <tbody>
                {listTicketFiltered && Array.isArray(listTicketFiltered) ? (
                  <>
                    {listTicketFiltered.map((ticket, index) => {
                      const assignedUser = listUsers.find(
                        (user) => user.id === ticket.assigneeId
                      );

                      return (
                        <tr
                          className={`${
                            index % 2 !== 0 ? 'bg-white' : 'bg-gray-100'
                          } border-b cursor-pointer hover:bg-gray-200`}
                          onClick={() =>
                            navigate(`/${ticket.id}`, {
                              replace: false,
                            })
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ticket.description}
                          </td>
                          <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {assignedUser
                              ? assignedUser.name
                              : ticket.assigneeId}
                          </td>
                          <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ticket.completed ? (
                              <i className="fa-solid fa-check text-green-600"></i>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markCompleteTicket(ticket.id);
                                }}
                                className="text-green-600 transition-colors duration-200 focus:outline-none hover:text-blue-500"
                              >
                                Mark as complete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <span>...</span>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
