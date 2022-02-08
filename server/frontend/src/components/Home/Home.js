function Home() {
  return (
    <h1>Welcome to Movie Manager, {localStorage.getItem("uid")}!</h1>
  );
}

export default Home;