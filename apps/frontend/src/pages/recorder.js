import React from "react";
import SpeachToTextContainer from "../containers/speachToText/SpeachToTextContainer";

const UploadAudioPage = ({ className }) => {

  return (
      <main className={className}>
          <SpeachToTextContainer />
      </main>
  );
};

export default UploadAudioPage;

export const Head = () => <title>Upload Interview</title>;
