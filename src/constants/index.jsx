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
  "Cancelled",
  "Returned",
];
export const ROLE = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
};
