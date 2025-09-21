import React from "react"

const NotFound = () => {
  return (
    <div>
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1 className="text-bold text-black">Page not found</h1>
      <p className="text-black">Try the <a href="/">home page</a>.</p>
    </main>
    </div>
  );
};

export default NotFound;
