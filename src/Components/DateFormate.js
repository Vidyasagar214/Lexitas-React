

export const DateFormate = (data) =>{
    const now = new Date(data);
    const dateString = now.toLocaleDateString({
   weekday: "short",
   year: "numeric",
   month: "2-digit",
  day: "numeric"
   })
   return dateString
}