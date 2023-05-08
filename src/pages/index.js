import React from "react";
import SpeachToTextContainer from "../containers/speachToText/SpeachToTextContainer";
import logo from "../images/logo.svg"
const IndexPage = () => {
  const mainContainerStyles = {
    textAlign: "center"
  }
  // const logoStyles = {
  //   width: "150px",
  //   margin: "20px 0 0 0"
  // }
  return (
    <main style={mainContainerStyles}>
        {/* <img style={logoStyles} src={logo} /> */}
        <SpeachToTextContainer />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
