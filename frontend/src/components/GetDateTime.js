export default function GetDateTime({ ISOString }) {
  const date = new Date(ISOString);
  
  return (
    <time dateTime={ISOString} className="text-gray-600">
      {date.toLocaleString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // This forces the AM/PM format
      })}
    </time>
  );
}