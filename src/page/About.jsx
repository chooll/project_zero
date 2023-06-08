import React from "react";
import Header from "../component/about-page/Header";
import AboutProduct from "../component/about-page/AboutProduct";
import "../style/about-page-style/about-page-product.scss";
import FunctionalProduct from "../component/about-page/FunctionalProduct";
import SubscribeBlock from "../component/about-page/SubsribeBlock";

function About() {
  return (
    <section className="about-page">
      <Header />
      <AboutProduct />
      <FunctionalProduct />

      <SubscribeBlock />
    </section>
  );
}
export default About;
