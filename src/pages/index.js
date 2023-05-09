import React from 'react';
import SpeachToTextContainer from '../containers/speachToText/SpeachToTextContainer';
import Footer from '../ui/Footer';
import HeaderTags from '../ui/HeaderTags';
import GlobalStyle from '../styles/global';

const IndexPage = () => {
    const mainContainerStyles = {
        textAlign: 'center',
    };
    return (
        <>
            <GlobalStyle />
            <main style={mainContainerStyles}>
                <SpeachToTextContainer />
                <Footer />
            </main>
        </>
    );
};

export default IndexPage;

export const Head = () => (
    <>
        <HeaderTags />
    </>
);
