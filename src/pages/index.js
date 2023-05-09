import React from "react";
import SpeachToTextContainer from "../containers/speachToText/SpeachToTextContainer";
import logo from "../images/logo.svg"
import Footer from "../ui/Footer"

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
        <Footer />
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Ayudante de la Cruz Roja</title>
    <meta name="robots" content="noindex,nofollow" />

  </>
)
