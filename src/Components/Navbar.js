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
};

export default Navbar;
