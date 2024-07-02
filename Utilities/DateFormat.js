// Add Date Suffixes
const AddDateSuffix = (Date) => {
    let DateString = Date.toString();

    // Get Last Character of Date String
    const LastCharacter = DateString.charAt(DateString.length - 1);

    if(LastCharacter === '1' && DateString !== '11') {
        DateString = `${DateString}st`;
    } else if(LastCharacter === '2' && DateString !== '12') {
        DateString = `${DateString}nd`;
    } else if(LastCharacter === '3' && DateString !== '13') {
        DateString = `${DateString}rd`;
    } else {
        DateString = `${DateString}th`;
    }

    return DateString;
};

// Format Timestamp (Accepts Timestamp & 'Options' Object as Parameters)
module.exports = (
    Timestamp,
    { MonthLength = 'Short', DateSuffix = true } = {}
) => {
    // Create Month Object
    const Months = {
        0: MonthLength === 'Short' ? 'Jan' : 'January',
        1: MonthLength === 'Short' ? 'Feb' : 'February',
        2: MonthLength === 'Short' ? 'Mar' : 'March',
        3: MonthLength === 'Short' ? 'Apr' : 'April',
        4: MonthLength === 'Short' ? 'May' : 'May',
        5: MonthLength === 'Short' ? 'Jun' : 'June',
        6: MonthLength === 'Short' ? 'Jul' : 'July',
        7: MonthLength === 'Short' ? 'Aug' : 'August',
        8: MonthLength === 'Short' ? 'Sep' : 'September',
        9: MonthLength === 'Short' ? 'Oct' : 'October',
        10: MonthLength === 'Short' ? 'Nov' : 'November',
        11: MonthLength === 'Short' ? 'Dec' : 'December'
    };

    const DateObject = new Date(Timestamp);
    const FormattedMonth = Months[DateObject.getMonth()];

    const DayOfMonth = DateSuffix
        ? AddDateSuffix(DateObject.getDate())
        : DateObject.getDate();
    
    const Year = DateObject.getFullYear();

    // Set Time and Adjust Hour '0' to '12'
    let Hour =
        DateObject.getHours() > 12
            ? Math.floor(DateObject.getHours() - 12)
            : DateObject.getHours();
    
    if (Hour === 0) {
        Hour = 12;
    }

    const Minutes = (DateObject.getMinutes() < 10 ? '0' : '') + DateObject.getMinutes();

    // Set 'AM' or 'PM'
    const PeriodOfDay = DateObject.getHours() >= 12 ? 'PM' : 'AM';

    const FormattedTimestamp = `${FormattedMonth} ${DayOfMonth}, ${Year} at ${Hour}:${Minutes} ${PeriodOfDay}`;

    return FormattedTimestamp;
};