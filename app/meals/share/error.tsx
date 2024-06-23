'use client' // Error components must be Client Components

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
};

export default Error;
