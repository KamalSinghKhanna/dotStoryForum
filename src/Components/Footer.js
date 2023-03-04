import React from "react";
import "./Footer.css";

import home from "../images/home.svg";
import users from "../images/users.svg";
import user from "../images/user.svg";
import activeBorder from "../images/active-border.svg";
import { toast, Toaster } from "react-hot-toast";

export const Footer = () => {
  return (
    <footer>
      <div className="footer_content">
        <div>
          <img
            src={home}
            alt="Home"
            onClick={() => {
              toast("Coming Soon", {
                duration: 2000,
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
            }}
          />
        </div>
        <div>
          <img src={users} alt="Users" />
        </div>
        <div>
          <img
            src={user}
            alt="User"
            onClick={() => {
              toast("Coming Soon", {
                duration: 2000,
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
            }}
          />
        </div>
      </div>
      <div className="footer_active_tab">
        <img src={activeBorder} alt="Active Tab" />
      </div>
    </footer>
  );
};
