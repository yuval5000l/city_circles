import React from "react";

export default function calculateTime(time)
{
    // console.log(time);
    // console.log(typeof (time));
    const now = new Date();
    const timeDiff = now.getTime() - time.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return(<div>
            {(seconds > 60) ?
                (<div>
                    {(minutes > 60) ?
                        (<div>{(hours > 23) ? (<div>{days} days</div>) :
                            (<div>{hours} hours</div>)}</div>)
                        :
                        (<div>{minutes} minutes</div>)}
                </div>)
                :
                (<div>{seconds} seconds</div>)}
        </div>
    )
}