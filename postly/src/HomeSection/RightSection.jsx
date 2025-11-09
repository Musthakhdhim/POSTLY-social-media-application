import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../models/SubscriptionModal";
import { useState } from "react";
import React from "react";

export default function RightSection() {

   const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
  
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  const handleChangeTheme = () => {
    console.log("handle theme change");
  };

  return (
    <div className="py-5 sticky top-0 space-y-6">
      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="py-3 rounded-full text-gray-700 w-full pl-12 pr-4 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        <Brightness4Icon
          className="ml-3 cursor-pointer text-gray-600 hover:text-green-500"
          onClick={handleChangeTheme}
        />
      </div>

      {/* Get Verified Section */}
      <section className="bg-gray-100 rounded-xl p-4 text-left">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <p className="font-semibold my-2 text-gray-700">
          Subscribe to unlock new features
        </p>
        <Button
        
          variant="contained"
          sx={{
            padding: "10px",
            bgcolor:"green",
            paddingX: "20px",
            borderRadius: "25px",
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>

      {/* What's Happening Section */}
      <section className="bg-gray-100 rounded-xl p-4 space-y-5 text-left">
        <h1 className="font-bold text-xl py-1">What's happening</h1>

        {/* Example News */}
        <div>
          <p className="text-sm text-gray-500">
            FIFA 2026 Men's World Cup · Argentina vs Brazil
          </p>
          <p className="font-bold">FIFA 2026 Men's World Cup</p>
        </div>

        {/* Trending Topics */}
        {[1, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex justify-between w-full hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <div className="text-left">
              <p className="text-gray-500 text-sm">Entertainment · Trending</p>
              <p className="font-bold">#MCU</p>
              <p className="text-gray-500 text-sm">56.8k posts</p>
            </div>
            <MoreHorizIcon className="text-gray-500" />
          </div>
        ))}
      </section>

      <section>
        <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}/>
      </section>
    </div>
  );
}