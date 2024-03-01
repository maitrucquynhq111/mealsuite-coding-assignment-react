import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Ticket } from '@acme/shared-models';
import { MAIN_ROUTE_API } from '../../config';
import useApp from '../../hooks/useApp';
import { Console } from 'console';

export function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listUsers, setLoading } = useApp();
  const [ticketDetail, setTicketDetail] = useState<Ticket | null>(null);
  const [changeAssignee, setChangeAssignee] = useState<boolean>(false);
  const [assignee, setAssignee] = useState<number | null>(null);

  const assignedUser = useMemo(() => {
    return listUsers.find((user) => user.id === ticketDetail?.assigneeId);
  }, [listUsers, ticketDetail]);

  useEffect(() => {
    fetchTicketDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTicketDetail = async () => {
    setLoading(true);
    const data = await fetch(`${MAIN_ROUTE_API.GET_TICKETS}/${id}`).then();
    setTicketDetail(await data.json());
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chooseAssignee = (e: any) => setAssignee(e?.target?.value);

  const assignToUser = async () => {
    setLoading(true);
    const url = (MAIN_ROUTE_API.ASSIGN_USER || '')
      .replace('{ticketId}', (ticketDetail?.id || 0).toString())
      .replace('{userId}', (assignee || 0).toString());
    const data = await fetch(url, {
      method: 'PUT',
    }).then();
    if (data.ok === true) {
      await fetchTicketDetail();
      setChangeAssignee(false);
    }
    setLoading(false);
  };

  const markCompleteTicket = async () => {
    setLoading(true);
    const url = (MAIN_ROUTE_API.COMPLETE_TICKET || '').replace(
      '{ticketId}',
      (ticketDetail?.id || 0).toString()
    );
    const data = await fetch(url, {
      method: 'PUT',
    }).then();
    if (data.ok === true) {
      fetchTicketDetail();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-center text-3xl font-bold text-sky-500">
        Detail Tickets
      </h2>
      <button
        onClick={() =>
          navigate('/', {
            replace: false,
          })
        }
        className="text-gray-700 font-semibold transition-colors duration-200 focus:outline-none hover:text-blue-500"
      >
        <i className="fa-solid fa-circle-chevron-left"></i> Back to ticket list
      </button>
      <div className="max-w-[26rem]  \whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none mt-4">
        <div className="mb-2 flex items-center gap-3">
          <h3 className="block font-sans text-base font-medium leading-relaxed tracking-normal text-blue-gray-900 antialiased transition-colors hover:text-pink-500">
            Assignee:{' '}
            {assignedUser ? assignedUser?.name : ticketDetail?.assigneeId}
          </h3>
          {changeAssignee ? (
            <i
              className="fa-solid fa-floppy-disk cursor-pointer"
              onClick={() => assignToUser()}
            />
          ) : (
            <i
              className="fa-solid fa-pen cursor-pointer"
              onClick={() => setChangeAssignee(true)}
            />
          )}
        </div>
        {changeAssignee && (
          <div className="flex flex-1 items-center mb-2">
            <form>
              <select
                id="countries"
                onChange={chooseAssignee}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Choose Assignee</option>
                {listUsers.map((user, index) => (
                  <option key={index + user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        )}
        <p className="mb-2 block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
          Description: {ticketDetail?.description}
        </p>
        <div className="mb-2 flex items-center gap-5">
          {ticketDetail?.completed ? (
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-circle-check text-green-600"></i>
              <p className="block font-sans text-sm font-normal text-green-600 antialiased">
                Completed
              </p>
            </div>
          ) : (
            <button
              onClick={() => markCompleteTicket()}
              className="text-green-600 transition-colors duration-200 focus:outline-none hover:text-blue-500"
            >
              Mark as complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
