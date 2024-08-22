import { HeaderBox } from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn  = await getLoggedInUser();
  console.log("loggedon" + loggedIn);

  return <section className="home">
    <div className="home-content">
        <header className="home-header">
            <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name}
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
    <RightSidebar user={loggedIn} transactions={[]} banks={[]}/>

  </section>;
};

export default Home;
