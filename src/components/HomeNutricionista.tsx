import HorizontalDatePicker from "./HorizontalDatePicker";

export default function HomeNutricionista() {
    return (
        <div 
            className="
                flex 
                flex-col
                gap-5
                py-5
            "
        >
            <p className="font-bold text-xl">Buen día, Juan</p>
            <HorizontalDatePicker />
        </div>
    )
}