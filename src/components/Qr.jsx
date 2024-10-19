import React from "react";
import QRCode from "react-qr-code";

function Qr({show}) {
  const currentUrl = window.location.href;
  
  return (
    <>
    {show ? (<div className="my-2 d-flex justify-content-center">
      <QRCode value={currentUrl} />
    </div>):null}
    </>
  );
}

export default Qr;
