import NavigationCard from "./NavigationCard";
import TopNavigationCard from "./TopNavigationCard";

export default function Layout({children,hideNavigation}) {
  let rightColumnClasses = '';
  if (hideNavigation) {
    rightColumnClasses += 'w-full';
  } else {
    rightColumnClasses += 'mx-4 md:mx-0 md:w-9/12';
  }
  return (
    <div className="md:flex mt-0 max-w-4xl mx-auto gap-6 mb-24 md:mb-0">
      {!hideNavigation && (
        <div className="z-10 bg-white md:static w-full top-0 visible xl:hidden 2xl:hidden lg:hidden">
          <TopNavigationCard />
        </div>
      )}
      {!hideNavigation && (
        <div className="z-10 bg-white fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>
        {children}
      </div>
    </div>
  );
}