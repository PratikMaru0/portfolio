export const handleNavigation = (
  linkPath: string,
  isAdminRoute?: any,
  navigate?: any
) => {
  if (isAdminRoute) {
    // If on admin route, navigate to main page first
    navigate("/");
    // Then scroll to section after a short delay to ensure page loads
    setTimeout(() => {
      const element = document.getElementById(linkPath);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", `#${linkPath}`);
      }
    }, 100);
  } else {
    // If on main page, just scroll to section
    const element = document.getElementById(linkPath);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${linkPath}`);
    }
  }
};
