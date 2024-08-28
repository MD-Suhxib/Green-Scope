import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Green-Scope</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>Home</li>
        <li style={styles.navItem}>About</li>
        <li style={styles.navItem}>Gallery</li>
        <li style={styles.navItem}>Contact</li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#177245",
    padding: "1rem",
    flexWrap: "wrap", // This allows the navbar content to wrap when the screen size is smaller
  },
  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 1rem",
    color: "#fff",
    cursor: "pointer",
  },
  // Media queries for responsiveness
  "@media (max-width: 768px)": {
    navLinks: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    navItem: {
      margin: "0.5rem 0",
    },
  },
  "@media (max-width: 425px)": {
    logo: {
      fontSize: "1.2rem",
    },
    navItem: {
      fontSize: "0.9rem",
    },
  },
  "@media (max-width: 375px)": {
    logo: {
      fontSize: "1rem",
    },
    navItem: {
      fontSize: "0.8rem",
      margin: "0.3rem 0",
    },
  },
  "@media (max-width: 325px)": {
    logo: {
      fontSize: "0.9rem",
    },
    navItem: {
      fontSize: "0.7rem",
    },
  },
};

export default Navbar;
