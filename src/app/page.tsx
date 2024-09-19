import React from "react";
import Filters from "../components/Filters";

const Home: React.FC = async () => {

  return (
    <div className="container vh-100">
      <main>
        <div className="my-3">
          <Filters />
        </div>
      </main>
    </div>
  );
}

export default Home;
