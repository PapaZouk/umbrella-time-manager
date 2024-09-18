export const sortTimesByDay = (times) => {
    return times.slice().sort((a, b) => {
  
        return a.day - b.day;
       });
}