export function Loading() {
  return (
    <div className="fixed z-50 top-0 left-0 bg-gray-50 bg-opacity-40 w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 text-sky-500">
        <svg
          fill="none"
          className="w-10 h-10 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fill-rule="evenodd"
          />
        </svg>
        <div>Loading ...</div>
      </div>
    </div>
  );
}

export default Loading;
