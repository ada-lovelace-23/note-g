import React from 'react';

const HeaderTags = () => {
    return (
        <>
          <title>Ayudante de la Cruz Roja</title>
          <meta name="robots" content="noindex,nofollow" />
          <link rel="apple-touch-icon" sizes="57x57" href={"/apple-icon-57x57.png"}/>
          <link rel="apple-touch-icon" sizes="60x60" href={"/apple-icon-60x60.png"}/>
          <link rel="apple-touch-icon" sizes="114x114" href={"/apple-icon-114x114.png"}/>
          <link rel="icon" type="image/png" sizes="192x192"  href={"/android-icon-192x192.png"}/>
          <link rel="icon" type="image/png" sizes="32x32" href={"/favicon-32x32.png"}/>
          <link rel="icon" type="image/png" sizes="16x16" href={"/favicon-16x16.png"}/>
          <link rel="manifest" href={"/manifest.json"}/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
        </>
    );
};

export default HeaderTags;
