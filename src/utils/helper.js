import moment from "moment";

export const generateRandomColors = () => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    console.log('#' + randomColor)
    return '#' + randomColor
}

export const getLocalTimeFormat = (timeStamp) => {
    const localTimestamp = moment(moment.utc(timeStamp).toDate()).local()
    return localTimestamp.fromNow()
}