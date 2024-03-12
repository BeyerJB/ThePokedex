import React, { useState, useEffect } from "react";

const Cry = ({ url }) => {
  //console.log("TRYING WITH LINK: ", url)

  var cry = new Audio(url);

  return (
    <div>
      <button id="cryButton" onClick={() => cry.play()}>&#x1F50A;</button>
    </div>
  )
}
export default Cry;