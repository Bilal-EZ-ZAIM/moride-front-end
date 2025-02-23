import { Link } from "react-router-dom";

interface ContactsListProps {
  contacts: any[];
  selectedContact: any | null;
  onSelectContact: (contact: any) => void;
}

const formatDate = (dateString: string): string => {
  const now = new Date();
  const messageDate = new Date(dateString);

  const diffInSeconds = (now.getTime() - messageDate.getTime()) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInMonths / 12;

  if (diffInYears >= 1) {
    return `Il y a ${Math.floor(diffInYears)} an(s)`;
  } else if (diffInMonths >= 1) {
    return `Il y a ${Math.floor(diffInMonths)} mois`;
  } else if (diffInDays >= 1) {
    return `Il y a ${Math.floor(diffInDays)} jour(s)`;
  } else if (diffInHours >= 1) {
    return `Il y a ${Math.floor(diffInHours)} heure(s)`;
  } else if (diffInMinutes >= 1) {
    return `Il y a ${Math.floor(diffInMinutes)} minute(s)`;
  } else {
    return 'À l\'instant';
  }
};

export function ContactsList({
  contacts,
  selectedContact,
  onSelectContact,
}: ContactsListProps) {
  return (
    <div className="w-full md:w-80 bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Home
        </Link>
      </div>
      <div className="divide-y">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            onClick={() => onSelectContact(contact)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedContact?.id === 1 ? "bg-emerald-50" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt={contact.roomName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.isOnline === true && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {contact.username}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(contact.lastMessage.time)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {contact.lastMessage.content}
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  {contact.isOnline === true ? (
                    <span className="text-xs text-green-500">En ligne</span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      {contact.lastSeen}
                    </span>
                  )}
                </div>
              </div>
              {contact.isOnline ? (
                <div className="ml-2 bg-emerald-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {contact.unreadCount}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
