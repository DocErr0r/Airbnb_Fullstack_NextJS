export function daysfun(date1:string, date2:string) {
    // Parse the dates
    const d1:any = new Date(date1);
    const d2:any= new Date(date2);

    // Calculate the time difference in milliseconds
    const timeDifference = d2 - d1;

    // Convert time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
}
