import React from 'react';

export default function Header() {
  return <div>
      <div className="overlay"></div>
      <header>
          <img src='../images/logo.png' className="App-logo" alt="logo" />
          <h1>games Store</h1>
      </header>
        <nav>
            <h2><a href="#0">STORE</a></h2>
            <h2><a href="#0">NEWS</a></h2>
            <h2><a href="#0">FAQ</a></h2>
            <h2><a href="#0">SUPPORT</a></h2>
            <h2><a href="#0">CONTACT US</a></h2>
            <h2><a href="#0">MY ACCOUNT</a></h2>
        </nav>
  </div>;
}
