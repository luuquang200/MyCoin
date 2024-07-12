import React from "react";
import Header from "./Header";
import AddressSection from "./AddressSection";
import QRCode from "./QRCode";

function PaperWallet() {
  return (
    <main className="flex flex-col pt-8 bg-white rounded-xl shadow-lg max-w-[744px]">
      <div className="flex flex-col justify-center px-20 pb-8 mt-8 w-full max-md:px-5 max-md:max-w-full">
        <AddressSection /> 
        <hr className="shrink-0 mt-6 h-px border-t border-solid border-black border-opacity-10 max-md:max-w-full" />
        <QRCode />
      </div>
    </main>
  );
}

export default PaperWallet;
