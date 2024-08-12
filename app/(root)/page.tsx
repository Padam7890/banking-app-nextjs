import { HeaderBox } from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const loggedIn = {
    firstName: "John",
    lastName: "Doe",
    // name: "John Doe",
    email: "john.doe@example.com",
    image: "https://example.com/john-doe.jpg",
    balance: 1250.35,
}
const Home = () => {
  return <section className="home">
    <div className="home-content">
        <header className="home-header">
            <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"
            }
            subtext="Acess and mange Your account and Transactions"
            />
            <TotalBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250.35}

            />


        </header>

        Recent Transaction
    </div>
    <RightSidebar user={loggedIn} transactions={[]} banks={[{},{}]}/>

  </section>;
};

export default Home;
