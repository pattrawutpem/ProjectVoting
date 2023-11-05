import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="mt-5">
      <div className="bg-blue-950 w-full">
        <div className="container py-5">
          <div className="text-light">
            <p>2023 Computer Science 63</p>
            <p>CRRU: Chiang Rai Rajabhat University</p>
            <Link to="https://github.com/pattrawutpem">Pattrawut Pota</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
