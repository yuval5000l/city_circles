import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import Business from "../Classes/BusinessClass";
import dayjs from "dayjs";

function getHoursAndMinutes(day) {
    return "start " + day[0].format("HH") + "," + day[0].format("MM") + " end " + day[1].format("HH") + "," + day[1].format("MM");
    // return {"Start":[day[0].format("HH"), day[0].format("MM")],
    //     "End":[day[1].format("HH"), day[1].format("MM"),]}
}
const FileReaderComponent = () => {
    const [data, setData] = useState(null);

    const handleCSVFile = (data, fileInfo) => {
        // Handle CSV data
        console.log(data);
        console.log(data.length);

        setData(data);
    };
    // console.log({
    //     "Sunday": getHoursAndMinutes([dayjs(),dayjs(),]),
    //     "Monday": getHoursAndMinutes([dayjs(),dayjs(),]), "Tuesday": getHoursAndMinutes([dayjs(),dayjs(),]),
    //     "Wednesday": getHoursAndMinutes([dayjs(),dayjs(),]), "Thursday": getHoursAndMinutes([dayjs(),dayjs(),]),
    //     "Friday": getHoursAndMinutes([dayjs(),dayjs(),]), "Saturday": getHoursAndMinutes([dayjs(),dayjs(),])
    // });
    const handleSubmit = async () =>
    {
        let businessType = [];
        for (let i = 1; i < data.length; i ++)
        {
            if (data[i][1] !== "")
            {
                businessType.push(data[i][1])
            }
            if (data[i][2] !== "")
            {
                businessType.push(data[i][2])
            }
            if (data[i][3] !== "")
            {
                businessType.push(data[i][3])
            }
            let businessName = data[i][4];
            let businessLocation = data[i][5];
            let businessPhone = data[i][6];
            if (businessPhone !== undefined && businessPhone !== null && businessPhone !== "")
            {
                businessPhone = businessPhone.slice(1);
            }
            let whatsappLink = data[i][7];
            let instagramLink = data[i][8];
            let facebookLink = data[i][9];
            let websiteLink = data[i][10];
            let photoUrl = "";
            // photoUrl = `https://firebasestorage.googleapis.com/v0/b/citycircle-a1014.appspot.com/o/projectFiles%2FBusinessPhotos%2F${i}.jpg?alt=media&token=275cfe50-41a2-4bd7-bfe7-05f39707bed7`

                await Business.makeBusiness(businessName, businessType, businessLocation,
                photoUrl, [{
                    "Sunday": getHoursAndMinutes([dayjs(),dayjs(),]),
                    "Monday": getHoursAndMinutes([dayjs(),dayjs(),]), "Tuesday": getHoursAndMinutes([dayjs(),dayjs(),]),
                    "Wednesday": getHoursAndMinutes([dayjs(),dayjs(),]), "Thursday": getHoursAndMinutes([dayjs(),dayjs(),]),
                    "Friday": getHoursAndMinutes([dayjs(),dayjs(),]), "Saturday": getHoursAndMinutes([dayjs(),dayjs(),])
                }],

                {Facebook: facebookLink,
                    Instagram: instagramLink,
                    Phone: businessPhone,
                    Website: websiteLink,
                    Whatsapp: whatsappLink},

                )
            businessType = [];
        }
        console.log("FINISHED");
    }


    // console.log(data[1][1])
    return (
        <div>
            <h2>CSV File Reader</h2>
            <CSVReader onFileLoaded={handleCSVFile} />
            <div>
                {data && (
                    <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
                )}
            </div>
            <button onClick={handleSubmit}> Upload dat</button>
        </div>
    );
};

export default FileReaderComponent;