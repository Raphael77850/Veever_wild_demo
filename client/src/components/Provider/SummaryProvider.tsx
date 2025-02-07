import activityLogo from "../../../public/assets/images/activity.svg";
import typeLogo from "../../../public/assets/images/ambiance.svg";
import budgetLogo from "../../../public/assets/images/euro.svg";
import hotelLogo from "../../../public/assets/images/hotel.svg";
import locationLogo from "../../../public/assets/images/location.svg";
import restaurantLogo from "../../../public/assets/images/restaurant.svg";
import PriceDisplay from "../../services/Provider/PriceDisplay";
import TypeDisplay from "../../services/Provider/TypeDisplay";
import type { Chr } from "../../types/Provider/ProviderType";

export default function SummaryProvider({ chr }: { chr: Chr }) {
  return (
    <ul className="summary">
      <li>
        <img src={typeLogo} alt="" />
        <TypeDisplay type={chr.type} />
      </li>
      <li className="summaryAddress">
        <img src={locationLogo} alt="" />
        {chr.address}
      </li>
      {chr.type === "activity" ? (
        <li className="summaryInfoActivity">
          <img alt="" src={activityLogo} />
          {+chr.additional_info / 60}
          {+chr.additional_info / 60 > 1 ? " heures" : " heure"}
        </li>
      ) : (
        <li className="">
          {chr.type === "hotel" ? (
            <img alt="" src={hotelLogo} />
          ) : (
            <img alt="" src={restaurantLogo} />
          )}
          {chr.additional_info}
        </li>
      )}
      <li className="summaryBudget">
        <img src={budgetLogo} alt="" />{" "}
        <PriceDisplay price={+chr.average_budget} />
      </li>
    </ul>
  );
}
