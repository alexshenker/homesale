import { Amenities } from "@prisma/client";

const amenityToLabel: Record<Amenities, string> = {
    Laundry_Washer: "Washer",
    Laundry_Dryer: "Dryer",

    Cooling_Central: "Central",
    Cooling_WallUnit: "Wall Unit",
    Cooling_WindowUnit: "Window Unit",

    Heating_Baseboard: "Baseboard",
    Heating_ForcedAir: "Forced Air",
    Heating_HeatPump: "Heat Pump",
    Heating_WallUnit: "Wall-Unit",

    Appliances_Dishwasher: "Dishwasher",
    Appliances_Refrigerator: "Refrigerator",
    Appliances_Microwave: "Microwave",
    Appliances_Oven: "Oven",
    Appliances_ElectricStove: "Electric Stove",
    Appliances_GasStove: "Gas Stove",

    Outdoor_Balcony: "Balcony",
    Outdoor_Deck: "Deck",
    Outdoor_Rooftop: "Rooftop",
    Outdoor_Patio: "Patio",
    Outdoor_Waterfront: "Waterfront",
    Outdoor_Beachfront: "Beachfront",

    Storage_BicycleStorage: "Bicycle Storage",
    Storage_StorageSpace: "Storage Space",

    Accessibility_Elevator: "Elevator",
    Accessibility_DisabilityAccessible: "Disability Accessible",

    Other_Garage: "Garage",
    Other_Pool: "Pool",
    Other_Gym: "Gym",
    Other_ChildrensPlayroom: "Children's Playroom",
    Other_EVChargingStation: "EVC harging Station",
    Other_Doorman: "Doorman",
};

export default amenityToLabel;
