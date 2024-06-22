'use client' // Error components must be Client Components

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
};

export default Error;
