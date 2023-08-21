import React from "react";
import BreederBreadCumb from "../components/breeder/BreederBreadCumb";
import BreederAdoption from "../components/breeder/BreederAdoption";
import AdoptionPuppies from "../components/adoptions/AdoptionPuppies";
import AdoptionFaq from "../components/adoptions/AdoptionFaq";
import AdoptionGallery from "../components/adoptions/AdoptionGallery";
import PetAppointmentCard from "../components/appoinmentCard";

function BreederPage() {
  return (
    <main>
      <BreederBreadCumb />
      <AdoptionGallery />
      <BreederAdoption />
      <AdoptionPuppies />
      <AdoptionFaq />
    </main>
  );
}

export default BreederPage;
