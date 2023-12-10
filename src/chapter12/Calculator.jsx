import React, {useState} from "react";
import TemperatureInput  from "./TemperatureInput";

//물 끓음 여부 반환
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>
    }
    return <p>물이 끓지 않습니다.</p>
}

//화씨-> 섭씨, 섭씨 -> 화씨 변환
function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celsius){
    return (celsius * 9) / 5 + 32;
}

//온도랑 변환 함수를 파라미터로 받아서 계산된 값 리턴
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    //숫자 아니면 ""반환
    if(Number.isNaN(input)){
        return"";
    }
    const output = convert(input);
    //소수점 세자리까지 반올림
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props) {
    const[temperature, setTemperatur] = useState("");
    const[scale, setScale ] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperatur(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperatur(temperature);
        setScale("f");
    };

    const celsius = 
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = 
        scale ==="c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    );
}

export default Calculator;