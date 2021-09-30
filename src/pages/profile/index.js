import React from "react";

import ProfileForm from "../../components/Profile/ProfileForm";
import ProfileNav from "../../components/Profile/ProfileNav";

import style from "./profile.module.css";

function ProfilePage() {
  return (
    <section className={style.profile}>
      <ProfileNav />
      <div style={{ marginLeft: "80px" }}>
        <ProfileForm />
      </div>
    </section>
  );
}

export default ProfilePage;
