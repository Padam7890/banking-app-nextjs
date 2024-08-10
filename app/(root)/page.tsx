import { HeaderBox } from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const loggedIn = {
    name: "John Doe",
}
const Home = () => {
  return <section className="home">
    <div className="home-content">
        <header className="home-header">
            <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"
            }
            subtext="Acess and mange Your account and Transactions"
            />
            <TotalBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250.35}

            />


        </header>
    </div>

  </section>;
};

export default Home;
