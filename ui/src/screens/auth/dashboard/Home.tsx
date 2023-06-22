function Home({ userName }: { userName: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">
        welcome {userName} to the dashboard
      </h1>
    </div>
  );
}

export default Home;
