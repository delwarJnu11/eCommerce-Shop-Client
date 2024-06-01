import { CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  FaCamera,
  FaHeadphones,
  FaMobileAlt,
  FaMouse,
  FaPrint,
  FaTv,
} from "react-icons/fa";
import { GiBoxCutter, GiProcessor } from "react-icons/gi";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdWatch } from "react-icons/md";
import { TbDeviceAirpods } from "react-icons/tb";

export const productCategory = [
  { id: 1, label: "Airpodes", value: "airpod", icon: <TbDeviceAirpods /> },
  { id: 2, label: "Cameras", value: "camera", icon: <FaCamera /> },
  { id: 3, label: "Earphones", value: "earphone", icon: <FaHeadphones /> },
  { id: 4, label: "Mobiles", value: "mobile", icon: <FaMobileAlt /> },
  { id: 5, label: "Mouses", value: "mouse", icon: <FaMouse /> },
  { id: 6, label: "Printers", value: "printer", icon: <FaPrint /> },
  { id: 7, label: "Processors", value: "processor", icon: <GiProcessor /> },
  {
    id: 8,
    label: "Refrigerators",
    value: "refrigerator",
    icon: <CgSmartHomeRefrigerator />,
  },
  { id: 9, label: "Speakers", value: "speaker", icon: <HiSpeakerWave /> },
  { id: 10, label: "Televisions", value: "television", icon: <FaTv /> },
  { id: 11, label: "Trimmers", value: "trimmer", icon: <GiBoxCutter /> },
  { id: 12, label: "Watches", value: "watch", icon: <MdWatch /> },
];

export const STATUS = [
  "Pending",
  "Confirmed",
  "Dispatched",
  "In Transit",
  "Delivered",
];
export const ROLE = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
};

export const aboutData = [
  {
    id: 1,
    title: "Who We Are",
    description:
      "Shopee Group was formed in 2020, which led the business to broaden its offering across other product categories and shift into new markets across South Asia. Today, we are proud to be South Asia's leading e-commerce marketplace operating across Bangladesh, Pakistan, Sri Lanka and Nepal.",
  },
  {
    id: 2,
    title: "Our History",
    description:
      "Shopee is an e-commerce venture which started in Bangladesh in 2020. Financed by three German brothers, it has since expanded into both Myanmar and Bangladesh. Following a soft opening last October, Shopee officially opened in Bangladesh this February and has since then become a frontrunner in the e-commerce industry.",
  },
  {
    id: 3,
    title: "Our Mission",
    description:
      "our eye is on the future. By leveraging our innovative technology, we believe that we can create an ecosystem where every corner and person in the country can be connected. We want to help all Bangladeshis prosper in a 'Digital Bangladesh' we can build together.",
  },
];
