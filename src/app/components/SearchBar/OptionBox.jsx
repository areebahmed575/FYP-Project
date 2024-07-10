import React from 'react'

const OptionBox = ({ optionHandler, opitons }) => {
    return (
        <>
            <div className="optionsBox absolute left-0 top-[50px] w-[100%] py-[10px] px-[20px] rounded drop-shadow-xl bg-white">
                <div className="option flex justify-between items-center my-[10px]">
                    <span className="optionText">
                        Adult
                    </span>
                    <div className="optionCounter flex items-center gap-[10px]">
                        <button disabled={opitons.adults <= 1} className="optionCounterMinus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("adults", "dec")}>-</button>
                        <span className="optionCounterNumber">{opitons.adults}</span>
                        <button className="optionCounterPlus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("adults", "inc")}>+</button>
                    </div>
                </div>
                <div className="option flex justify-between items-center my-[10px]">
                    <span className="optionText">
                        Children
                    </span>
                    <div className="optionCounter flex items-center gap-[10px]">
                        <button disabled={opitons.childern <= 0} className="optionCounterMinus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("childern", "dec")}>-</button>
                        <span className="optionCounterNumber">{opitons.childern}</span>
                        <button className="optionCounterPlus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("childern", "inc")}>+</button>
                    </div>
                </div>
                <div className="option flex justify-between items-center my-[10px]">
                    <span className="optionText">
                        Room
                    </span>
                    <div className="optionCounter flex items-center gap-[10px]">
                        <button disabled={opitons.room <= 1} className="optionCounterMinus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("room", "dec")}>-</button>
                        <span className="optionCounterNumber">{opitons.room}</span>
                        <button className="optionCounterPlus rounded py-[5px] px-[10px] cursor-pointer bg-orange-400" onClick={() => optionHandler("room", "inc")}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OptionBox