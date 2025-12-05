import React, { useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContextApp } from '../../ContextApp';   
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ProjectsSubHeader() {

    return (
        <div className="flex justify-between items-center mt-20  font-bold">
            {/* My Projects Text */}
            <MyProjectsText/>
            {/* Sort By Button */}
            <SortByButton/>
        </div>
    );
    function MyProjectsText() {
        return <p className="text-[26px] font-bold text-slate-800">My Projects</p>;
        }
         function SortByButton() {const {
                openSortingDropDownObject: { setOpenSortingDropDown, openSortingDropDown },
                sortingDropDownPositionsObject: { setSortingDropDownPositions, sortingDropDownPositions },
                sortingOptionObject: { sortingOptions, setSortingOptions },
            } = useContextApp();

            const sortingLinkRef = useRef<HTMLDivElement>(null);

            let sortingLabel = "";

            const flatten = sortingOptions
            .flatMap((option) => option.options)
            .find((option) => option.selected);

            function clickedSortingLink() {
                if (sortingLinkRef.current) {
                const rect = sortingLinkRef.current.getBoundingClientRect();
                const { top, left, width } = rect;
                setSortingDropDownPositions({
                    top: top + window.scrollY + 30,
                    left: left + window.scrollX,
                    width: width,
                });
                }

                setOpenSortingDropDown(true);
            }
            if (flatten) {
  if (flatten.label === "A-Z" || flatten.label === "Z-A") {
    sortingLabel = `Order ${flatten.label}`;
  } else {
    sortingLabel = `${flatten.label} Projects`;
  }
}
        return (
    <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
      <span className="text-slate-300">Sort By</span>
      <div
        ref={sortingLinkRef}
        onClick={clickedSortingLink}
        className="flex gap-1 items-center cursor-pointer text-slate-800 hover:text-orange-600"
      >
        <span className="">{sortingLabel}</span>
        {openSortingDropDown ? (
          <KeyboardArrowUpIcon sx={{ fontSize: "19px" }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
        )}
      </div>
    </div>
  );
}
}
export default ProjectsSubHeader;